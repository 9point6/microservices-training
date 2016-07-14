var express = require('express');
var app = express();

// Gets list for given user
app.get('/:user/:listType', require('../lib/routes/get-uas-list'));
// Gets list for given user
app.get('/:user/:listType/:action/:pid', require('../lib/routes/update-uas-list'));

app.listen(3002, function () {
    console.log('UAS Gateway listening on port 3002');
});
