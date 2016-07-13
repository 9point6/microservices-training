var fs = require('fs');

module.exports = function (uasTopic) {
    var filePath = 'uas-' + uasTopic + '.json';
    var list = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    var listInstance = {};

    function saveList() {
        fs.writeFileSync(filePath, JSON.stringify(list), 'utf8');
    }

    listInstance.getUserList = function (userId) {
        return list[userId];
    };

    listInstance.addToUserList = function (userId, item) {
        if (!list[userId]) {
            list[userId] = [];
        }

        list[userId].push(item);
        saveList();
    };

    listInstance.deleteFromList = function (userId, itemPid) {
        list[userId] = list[userId].filter(function (item) {
            return item.pid !== itemPid;
        });
        saveList();
    };

    return listInstance;
};
