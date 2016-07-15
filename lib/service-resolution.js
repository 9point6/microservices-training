var nativeDns = require('native-dns');

function getPort(name, callback) {
    var question = nativeDns.Question({
        name: name + '.service.consul',
        type: 'SRV'
    });

    var req = nativeDns.Request({
        question: question,
        server: {
            address: '127.0.0.1',
            port: 8600
        }
    });

    req.on('timeout', function () {
      callback('timeout');
    });

    var results = [];
    req.on('message', function (err, res) {
      results = results.concat(res.answer.map(function (a) {
        return a.port;
      }));
    });

    req.on('end', function () {
        callback(null, results[0]);
    });

    req.send();
}

function getIp(name, callback) {
    var question = nativeDns.Question({
        name: name + '.service.consul',
        type: 'A'
    });

    var req = nativeDns.Request({
        question: question,
        server: {
            address: '127.0.0.1',
            port: 8600
        }
    });

    req.on('timeout', function () {
      callback('timeout');
    });

    var results = [];
    req.on('message', function (err, res) {
      results = results.concat(res.answer.map(function (a) {
        return a.address;
      }));
    });

    req.on('end', function () {
        callback(null, results[0]);
    });

    req.send();
}

module.exports.getService = function (name, callback) {
    getIp(name, function (err1, ip) {
        getPort(name, function (err2, port) {
            callback(err1 || err2, {
                ip: ip,
                port: port
            });
        });
    });
};
