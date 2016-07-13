var uasAdapter = require('./uas-adapter');
var eventSource = require('./event-source');
var favouritesList = uasAdapter('favourites');

module.exports.init = function () {
    eventSource.on('add-favourite', function(user, body) {
        favouritesList.addToUserList(user, body);
    });

    eventSource.on('delete-favourite', function(user, body) {
        favouritesList.deleteFromList(user, body.pid);
    });
}
