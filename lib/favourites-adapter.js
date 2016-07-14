var request = require('request');
var eventSource = require('./event-source');

module.exports.init = function () {
    eventSource.on('add-favourite', function(user, pid) {
        request('http://localhost:3002/' + user + '/favourites/add-favourite/' + pid);
    });

    eventSource.on('delete-favourite', function(user, pid) {
        request('http://localhost:3002/' + user + '/favourites/delete-favourite/' + pid);
    });
};
