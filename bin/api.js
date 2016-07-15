var express = require('express');
var bodyParser = require('body-parser');
var userAuthenticator = require('../lib/user-authenticator');
var eventSource = require('../lib/event-source');
var serviceRegistration = require('../lib/service-registration');

var config = {
    port: 3000 + Math.floor(Math.random() * 1000)
};

var app = express();
app.use(bodyParser.json());
app.use(userAuthenticator);

// Gets list for given user
app.get('/:listType/:user', require('../lib/routes/api-get-list'));
// Perform action on a list
app.get('/:listType/:user/:action/:pid', require('../lib/routes/api-update-list'));

app.get('/status', require('../lib/routes/status-check'));

app.listen(config.port, function () {
    console.log('API listening on port ' + config.port);
    eventSource.init('api', function () {
        console.log('connected to rabbitMQ');
        serviceRegistration.registerService('api', config.port, function (err, success) {
            if (success) {
                console.log('Registered api with consul');
            }
        });
    });
});
