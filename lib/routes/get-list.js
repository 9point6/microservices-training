var userAuthenticator = require('../user-authenticator.js');
var listBuilder = require('../list-builder.js');


module.exports = function (request, response) {
    var list = listBuilder.getList(request.params.user, request.params.listType);

    response.send(list);
};
