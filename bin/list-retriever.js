var fs = require('fs');
var express = require('express');
var eventSource = require('../lib/event-source');
var serviceRegistration = require('../lib/service-registration');

var config = {
    port: 3000 + Math.floor(Math.random() * 1000)
};

var app = express();
var builtLists;

function readBuiltLists() {
    builtLists = JSON.parse(fs.readFileSync('built-lists.json', 'utf8'));
}

app.get('/:user/:listName', function (request, response) {
    var user = request.params.user;
    var listName = request.params.listName;

    console.log('list-retriever-get-list', user, listName);
    if (builtLists[user] && builtLists[user][listName]) {
        return response.send(builtLists[user][listName]);
    }

    return response.send([]);
});
app.get('/status', require('../lib/routes/status-check'));

readBuiltLists();
app.listen(config.port, function () {
    console.log('List Retriever listening on port ' + config.port);
    eventSource.init('list-retriever', function () {
        console.log('Connected to RabbitMQ!');
        eventSource.on('list-built', readBuiltLists);

        serviceRegistration.registerService('list-retriever', config.port, function (err, success) {
            if (success) {
                console.log('Registered list-retriever with consul');
            }
        });
    });
});
