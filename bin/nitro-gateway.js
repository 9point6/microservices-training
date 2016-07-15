var express = require('express');
var bodyParser = require('body-parser');
var serviceRegistration = require('../lib/service-registration');

var config = {
    port: 3000 + Math.floor(Math.random() * 1000)
};

var app = express();
app.use(bodyParser.json());

// Gets list for given user
app.get('/asset/:pid', require('../lib/routes/nitro-get-asset'));
app.get('/status', require('../lib/routes/status-check'));

app.listen(config.port, function () {
    console.log('Nitro Gateway listening on port ' + config.port);
    serviceRegistration.registerService('nitro-gateway', config.port, function (err, success) {
        if (success) {
            console.log('Registered nitro-gateway with consul');
        }
    });
});
