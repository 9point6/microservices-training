var request = require('request');

module.exports.registerService = function (name, port, callback) {
    request({
        url: 'http://127.0.0.1:8500/v1/agent/service/register',
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
                HTTP: 'http://127.0.0.1:' + port + '/status',
                Interval: '10s',
                Timeout: '2s'
            }
        })
    }, function (err, response) {
        if (err) {
            console.error('Failed to register service', err);
        }
        callback(err, response && response.statusCode === 200);
    });
};
