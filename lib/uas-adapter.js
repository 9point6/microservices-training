var fs = require('fs');

var addActionMap = {
    favourites: 'favourited',
    follows: 'followed'
};

var addResourceTypeMap = {
    favourites: ['episode', 'clip'],
    follows: ['brand']
};

module.exports = function (uasTopic) {
    var filePath = 'uas-' + uasTopic + '.json';
    var list = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    var listInstance = {};

    function saveList(userId) {
        seen = {};
        list[userId] = list[userId].filter(function (item) {
            if (!seen[item.resourceId]) {
                seen[item.resourceId] = true;
                return true;
            }
            return false;
        });
        fs.writeFileSync(filePath, JSON.stringify(list), 'utf8');
    }

    listInstance.getUserList = function (userId) {
        return (list[userId] || []).map(function (item) {
            return {
                pid: item.resourceId,
                created: item.created,
                action: item.action,
                urn: item['@id']
            };
        });
    };

    listInstance.addToUserList = function (userId, itemPid) {
        if (!list[userId]) {
            list[userId] = [];
        }

        var resourceTypes = addResourceTypeMap[uasTopic];
        var resourceType = resourceTypes[Math.floor(resourceTypes.length * Math.random())];

        list[userId].push({
            activityType: uasTopic,
            personId: userId,
            resourceId: itemPid,
            resourceType: resourceType,
            resourceDomain: 'radio',
            created: (new Date()).toString(),
            action: addActionMap[uasTopic],
            '@id': 'urn:bbc:radio:episode:' + itemPid
        });
        saveList(userId);
    };

    listInstance.deleteFromList = function (userId, itemPid) {
        list[userId] = list[userId].filter(function (item) {
            return item.resourceId !== itemPid;
        });
        saveList(userId);
    };

    return listInstance;
};
