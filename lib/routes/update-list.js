var eventSource = require('../event-source.js');

var eventMap = {
    favourites: {
        add: 'add-favourite',
        delete: 'delete-favourite'
    },
    follows: {
        follow: 'follow',
        unfollow: 'unfollow'
    }
};

module.exports = function (request, response) {
    console.log('update-list', request.params.listType, request.params.action, request.params.pid);
    var eventName = eventMap[request.params.listType][request.params.action];

    if (!eventName) {
        return response.send({error: 'Invalid action'});
    }

    console.log('Sending event:', eventName, request.params.user, request.params.pid);
    eventSource.emit(eventName, {
        user: request.params.user,
        pid: request.params.pid
    });
    response.send({success: true});
};
