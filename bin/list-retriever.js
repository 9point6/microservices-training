var fs = require('fs');
var express = require('express');

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

readBuiltLists();
fs.watch('built-lists.json', 'utf8', readBuiltLists);

app.listen(3003, function () {
    console.log('List Retriever listening on port 3003');
});
