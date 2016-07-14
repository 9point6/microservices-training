var request = require('request');

module.exports = function (req, res) {
    var user = req.params.user;
    var listType = req.params.listType;

    console.log('get-list', user, listType);
    request('http://localhost:3003/' + user + '/' + listType, function (err, response) {
        res.send(response.body);
    });
};
