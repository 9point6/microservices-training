var uasAdapter = require('./uas-adapter');
var eventSource = require('./event-source');
var uasFavourites = uasAdapter('favourites');

module.exports.init = function () {
    eventSource.on('add-favourite', function(user, pid) {
        uasFavourites.addToUserList(user, pid);
    });

    eventSource.on('delete-favourite', function(user, pid) {
        uasFavourites.deleteFromList(user, pid);
    });
};
