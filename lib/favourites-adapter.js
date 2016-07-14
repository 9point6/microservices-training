var uasAdapter = require('./uas-adapter');
var eventSource = require('./event-source');
var favouritesList = uasAdapter('favourites');

module.exports.init = function () {
    eventSource.on('add-favourite', function(user, pid) {
        favouritesList.addToUserList(user, pid);
    });

    eventSource.on('delete-favourite', function(user, pid) {
        favouritesList.deleteFromList(user, pid);
    });
};
