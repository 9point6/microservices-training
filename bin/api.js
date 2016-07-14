var express = require('express');
var bodyParser = require('body-parser');
var userAuthenticator = require('../lib/user-authenticator');
var eventSource = require('../lib/event-source');

var app = express();
app.use(bodyParser.json());
app.use(userAuthenticator);

// Gets list for given user
app.get('/:listType/:user', require('../lib/routes/api-get-list'));
// Perform action on a list
app.get('/:listType/:user/:action/:pid', require('../lib/routes/api-update-list'));

app.listen(3000, function () {
    console.log('API listening on port 3000');
    eventSource.init('api', function () {
        console.log('connected to rabbitMQ');
    });
});
