var fs = require('fs');
var request = require('request');
var express = require('express');
var eventSource = require('../lib/event-source');
var serviceResolver = require('../lib/service-resolution');

var app = express();
var builtLists = JSON.parse(fs.readFileSync('built-lists.json', 'utf8'));

function saveList(userId, listType) {
    seen = {};
    builtLists[userId][listType] = builtLists[userId][listType].filter(function (item) {
        if (!seen[item.pid]) {
            seen[item.pid] = true;
            return true;
        }
        return false;
    });

    fs.writeFileSync('built-lists.json', JSON.stringify(builtLists), 'utf8');
    eventSource.emit('list-built');
}

function createUserIfMissing(user, listName) {
    if (!builtLists[user]) {
        builtLists[user] = {};
    }

    if (!builtLists[user][listName]) {
        builtLists[user][listName] = [];
    }
}

var getNitroAsset = (function () {
    var circuitBreakerOpen = false;

    function generateDummyResponse(pid) {
        return { pid: pid };
    }

    return function getNitroAsset(pid, callback) {
        serviceResolver.getService('nitro-gateway', function(err, service) {
            var url = 'http://' + service.ip + ':' + service.port + '/asset/' + pid;

            request(url, function (err, response) {
                if (circuitBreakerOpen) {
                    if (Date.now() > (circuitBreakerOpen + 10000)) {
                        console.log('Nitro-gateway circuit breaker expired, trying again');
                        circuitBreakerOpen = false;
                    } else {
                        console.log('Nitro-gateway circuit breaker open, responding with dummy data');
                        return callback('circuitBreakerOpen', generateDummyResponse(pid));
                    }
                }

                if (err) {
                    console.log('Nitro-gateway error, opening circuit breaker');
                    circuitBreakerOpen = Date.now();
                    return callback(err, generateDummyResponse(pid));
                }

                try {
                    callback(err, JSON.parse(response.body));
                } catch (ex) {
                    console.log('Nitro-gateway JSON error, opening circuit breaker');
                    circuitBreakerOpen = Date.now();
                    callback(ex, generateDummyResponse(pid));
                }
            });
        });
    };
})();

function listAddGenerator(listType) {
    return function (params) {
        console.log('add', listType, params);
        var user = params.user;
        var pid = params.pid;

        getNitroAsset(pid, function (err, asset) {
            if (asset) {
                createUserIfMissing(user, listType);
                builtLists[user][listType].push(asset);
                saveList(user, listType);
            }
        });
    };
}

function listDeleteGenerator(listType) {
    return function (params) {
        console.log('delete', listType, params);
        var user = params.user;
        var pid = params.pid;

        createUserIfMissing(user, listType);
        builtLists[user][listType] = builtLists[user][listType].filter(function (item) {
            return item.pid !== pid;
        });
        saveList(user, listType);
    };
}

app.get('/status', require('../lib/routes/status-check'));
app.listen(3004, function () {
    console.log('List builder listening on port 3004');
    eventSource.init('list-builder', function () {
        console.log('connected to rabbitMQ');

        eventSource.on('follow', listAddGenerator('follows'));
        eventSource.on('unfollow', listDeleteGenerator('follows'));

        eventSource.on('add-favourite', listAddGenerator('favourites'));
        eventSource.on('delete-favourite', listDeleteGenerator('favourites'));
    });
});
