var uasAdapter = require('../uas-adapter');

module.exports = function (request, response) {
    var listType = request.params.listType;
    var userName = request.params.user;

    console.log('get-uas-list', userName, listType);
    var list = uasAdapter(listType);
    response.send(list.getUserList(userName) || []);
};
