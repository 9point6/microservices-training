var uasAdapter = require('./uas-adapter');
var eventSource = require('./event-source');
var followsList = uasAdapter('follows');

module.exports.init = function () {
    eventSource.on('follow', function(user, pid) {
        followsList.addToUserList(user, pid);
    });

    eventSource.on('unfollow', function(user, pid) {
        followsList.deleteFromList(user, pid);
    });
};
