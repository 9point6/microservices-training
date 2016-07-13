var userAuthenticator = require('../user-authenticator.js');
var events = require('../event-source.js');

var eventMap = {
    favourites: {
        add: 'add-favourite',
        delete: 'delete-favourite'
    },
    follows: {
        add: 'follow',
        delete: 'unfollow'
    }
};

module.exports = function (request, response) {
    var eventName = eventMap[request.params.listType][request.params.action];
    events.emit(eventName, request.params.user, request.body);
    response.send({success: true});
};
