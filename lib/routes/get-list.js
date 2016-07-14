var listBuilder = require('../list-builder.js');

module.exports = function (request, response) {
    console.log('get-list', request.params.user, request.params.listType);
    var list = listBuilder.getList(request.params.user, request.params.listType);

    response.send(list || []);
};
