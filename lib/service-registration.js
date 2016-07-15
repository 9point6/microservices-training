var request = require('request');

module.exports.registerService = function (name, port, callback) {
    request({
        url: 'http://consul:8500/v1/agent/service/register',
        method: 'put',
        body: JSON.stringify({
            Name: name,
            Tags: [
                'master',
                'v1',
                'self-registered'
            ],
            Port: port,
            Check: {
                HTTP: 'http://' + name + ':' + port + '/status',
                Interval: '10s',
                Timeout: '2s'
            }
        })
    }, function (err, response) {
        callback(err, response && response.statusCode === 200);
    });
};
