var request = require('request');
var serviceResolver = require('../service-resolution');

module.exports = function (req, res) {
    var user = req.params.user;
    var listType = req.params.listType;

    console.log('get-list', user, listType);
    serviceResolver.getService('list-retriever', function (err, service) {
        var url = 'http://' + service.ip + ':' + service.port + '/' +
            user + '/' + listType;

        request(url, function (err, response) {
            res.send(response.body);
        });
    });
};
