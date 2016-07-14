var fs = require('fs');

function createUserIfMissing(builtLists, user, listName) {
    if (!builtLists[user]) {
        builtLists[user] = {};
    }

    if (!builtLists[user][listName]) {
        builtLists[user][listName] = [];
    }

    return builtLists;
}

module.exports.getList = function (user, listName) {
    var builtLists = JSON.parse(fs.readFileSync('built-lists.json', 'utf8'));
    buildLists = createUserIfMissing(builtLists, user, listName);
    return builtLists[user][listName];
};
