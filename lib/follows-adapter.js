var request = require('request');
var eventSource = require('./event-source');

module.exports.init = function () {
    eventSource.on('follow', function(user, pid) {
        request('http://localhost:3002/' + user + '/follows/follow/' + pid);
    });

    eventSource.on('unfollow', function(user, pid) {
        request('http://localhost:3002/' + user + '/follows/unfollow/' + pid);
    });
};
