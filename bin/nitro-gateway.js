var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

// Gets list for given user
app.get('/asset/:pid', require('../lib/routes/nitro-get-asset'));
app.get('/status', require('../lib/routes/status-check'));

app.listen(3001, function () {
    console.log('Nitro Gateway listening on port 3001');
});
