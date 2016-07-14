var fs = require('fs');
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

    console.log('builtLists', builtLists[user]);

    if (!builtLists[user][listName]) {
        builtLists[user][listName] = [];
    }
}

module.exports.init = function () {
    eventSource.on('follow', function (user, pid) {
        var asset = nitroRetriever.getAssetFromPid(pid);
        if (asset) {
            createUserIfMissing(user, 'follows');
            builtLists[user].follows.push(asset);
            saveList();
        }
    });

    eventSource.on('unfollow', function (user, pid) {
        var asset = nitroRetriever.getAssetFromPid(pid);
        if (asset) {
            createUserIfMissing(user, 'follows');
            builtLists[user].follows = builtLists[user].follows
                .filter(function (item) {
                    return item.pid !== pid;
                });
            saveList();
        }
    });

    eventSource.on('add-favourite', function (user, pid) {
        console.log('List builder add-favourite', user, pid);
        var asset = nitroRetriever.getAssetFromPid(pid);
        if (asset) {
            createUserIfMissing(user, 'favourites');
            builtLists[user].favourites.push(asset);
            saveList();
        }
    });

    eventSource.on('delete-favourite', function (user, pid) {
        var asset = nitroRetriever.getAssetFromPid(pid);
        if (asset) {
            createUserIfMissing(user, 'favourites');
            builtLists[user].favourites = builtLists[user].favourites
                .filter(function (item) {
                    return item.pid !== pid;
                });
            saveList();
        }
    });
};

module.exports.getList = function (user, listName) {
    console.log(builtLists);
    createUserIfMissing(user, listName);
    return builtLists[user][listName];
};
