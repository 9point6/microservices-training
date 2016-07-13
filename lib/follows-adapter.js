var uasAdapter = require('./uas-adapter');
var eventSource = require('./event-source');
var followsList = uasAdapter('follows');

module.exports.init = function () {
    eventSource.on('follow', function(user, body) {
        followsList.addToUserList(user, body);
    });

    eventSource.on('unfollow', function(user, body) {
        followsList.deleteFromList(user, body.pid);
    });
}
