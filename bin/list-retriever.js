var fs = require('fs');
var express = require('express');
var eventSource = require('../lib/event-source');

var app = express();
var builtLists;

function readBuiltLists() {
    builtLists = JSON.parse(fs.readFileSync('built-lists.json', 'utf8'));
}

app.get('/:user/:listName', function (request, response) {
    var user = request.params.user;
    var listName = request.params.listName;

    if (builtLists[user] && builtLists[user][listName]) {
        return response.send(builtLists[user][listName]);
    }

    return response.send([]);
});
app.get('/status', require('../lib/routes/status-check'));

readBuiltLists();
app.listen(3003, function () {
    console.log('List Retriever listening on port 3003');
    eventSource.init('list-retriever', function () {
        console.log('Connected to RabbitMQ!');
        eventSource.on('list-built', readBuiltLists);
    });
});
