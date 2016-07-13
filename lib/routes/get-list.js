var userAuthenticator = require('../user-authenticator.js');
var uasAdapter = require('../uas-adapter.js');

var uasLists = {
    favourites: uasAdapter('favourites'),
    follows: uasAdapter('follows')
};

module.exports = function (request, response) {
    var list = uasLists[request.params.listType]
        .getUserList(request.params.user);

    response.send(list);
};
