var uasAdapter = require('./uas-adapter');
var eventSource = require('./event-source');
var uasFollows = uasAdapter('follows');

module.exports.init = function () {
    eventSource.on('follow', function(user, pid) {
        uasFollows.addToUserList(user, pid);
    });

    eventSource.on('unfollow', function(user, pid) {
        uasFollows.deleteFromList(user, pid);
    });
};
