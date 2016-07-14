var fs = require('fs');

module.exports = function (uasTopic) {
    var filePath = 'uas-' + uasTopic + '.json';
    var list = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    var listInstance = {};

    function saveList(userId) {
        seen = {};
        list[userId] = list[userId].filter(function (item) {
            if (!seen[item.pid]) {
                seen[item.pid] = true;
                return true;
            }
            return false;
        });
        fs.writeFileSync(filePath, JSON.stringify(list), 'utf8');
    }

    listInstance.getUserList = function (userId) {
        return list[userId] || [];
    };

    listInstance.addToUserList = function (userId, itemPid) {
        if (!list[userId]) {
            list[userId] = [];
        }

        list[userId].push({
            pid: itemPid
        });
        saveList(userId);
    };

    listInstance.deleteFromList = function (userId, itemPid) {
        list[userId] = list[userId].filter(function (item) {
            return item.pid !== itemPid;
        });
        saveList(userId);
    };

    return listInstance;
};
