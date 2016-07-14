var fs = require('fs');
var request = require('request');
var eventSource = require('./event-source');
var nitroRetriever = require('./nitro-retriever');
var builtLists = JSON.parse(fs.readFileSync('built-lists.json', 'utf8'));

function saveList() {
    fs.writeFileSync('built-lists.json', JSON.stringify(builtLists), 'utf8');
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
    return function (user, pid) {
        getNitroAsset(pid, function (err, response) {
            var asset = JSON.parse(response.body);
            if (asset) {
                createUserIfMissing(user, listType + 's');
                builtLists[user][listType].push(asset);
                saveList();
            }
        });
    };
}

function listDeleteGenerator(listType) {
    return function (user, pid) {
        createUserIfMissing(user, listType + 's');
        builtLists[user][listType] = builtLists[user][listType].filter(function (item) {
            return item.pid !== pid;
        });
        saveList();
    };
}

module.exports.init = function () {
    eventSource.on('follow', listAddGenerator('follow'));
    eventSource.on('unfollow', listDeleteGenerator('follow'));

    eventSource.on('add-favourite', listAddGenerator('favourite'));
    eventSource.on('delete-favourite', listDeleteGenerator('favourite'));
};

module.exports.getList = function (user, listName) {
    createUserIfMissing(user, listName);
    return builtLists[user][listName];
};
