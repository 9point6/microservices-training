var express = require('express');
var bodyParser = require('body-parser');
var userAuthenticator = require('./lib/user-authenticator');

require('./lib/favourites-adapter').init();
require('./lib/follows-adapter').init();

var app = express();
app.use(bodyParser.json());
app.use(userAuthenticator);

// Gets list for given user
app.get('/:listType/:user', require('./lib/routes/get-list'));
// Perform action on a list
app.post('/:listType/:user/:action', require('./lib/routes/update-list'));

app.listen(3000);
