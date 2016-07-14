var fs = require('fs');
var request = require('request');
var eventSource = require('../lib/event-source');
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

function getNitroAsset(pid, callback) {
    request('http://localhost:3001/asset/' + pid, callback);
}

function listAddGenerator(listType) {
    return function (params) {
        var user = params.user;
        var pid = params.pid;

        getNitroAsset(pid, function (err, response) {
            var asset = JSON.parse(response.body);
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
        var user = params.user;
        var pid = params.pid;

        createUserIfMissing(user, listType);
        builtLists[user][listType] = builtLists[user][listType].filter(function (item) {
            return item.pid !== pid;
        });
        saveList(user, listType);
    };
}

console.log('Started List builder');
eventSource.init('list-builder', function () {
    console.log('connected to rabbitMQ');

    eventSource.on('follow', listAddGenerator('follows'));
    eventSource.on('unfollow', listDeleteGenerator('follows'));

    eventSource.on('add-favourite', listAddGenerator('favourites'));
    eventSource.on('delete-favourite', listDeleteGenerator('favourites'));
});
