var express = require('express');
var eventSource = require('../lib/event-source');
var uasAdapter = require('../lib/uas-adapter');
var serviceRegistration = require('../lib/service-registration');

var config = {
    port: 3400
};

var app = express();
var actionMap = {
    favourites: {
        'add-favourite': 'addToUserList',
        'delete-favourite': 'deleteFromList'
    },
    follows: {
        'follow': 'addToUserList',
        'unfollow': 'deleteFromList'
    }
};

function actionHandlerGenerator(listType, actionName) {
    return function (params) {
        console.log('queue-event', listType, actionName, params);
        var userName = params.user;
        var pid = params.pid;

        var list = uasAdapter(listType);
        if (!actionMap[listType]) {
            throw new Error('Unknown list type: ' + listType);
        }

        var methodToRun = actionMap[listType][actionName];
        if (!methodToRun) {
            throw new Error('Unknown action "' + actionName + '" for list type "' + listType + '"');
        }

        list[methodToRun](userName, pid);
    };
}

// Gets list for given user
app.get('/:user/:listType', require('../lib/routes/uas-get-list'));
app.get('/status', require('../lib/routes/status-check'));

app.listen(config.port, function () {
    console.log('UAS Gateway listening on port ' + config.port);
    eventSource.init('uas-gateway', function () {
        console.log('Connected to RabbitMQ!');
        eventSource.on('follow', actionHandlerGenerator('follows', 'follow'));
        eventSource.on('unfollow', actionHandlerGenerator('follows', 'unfollow'));

        eventSource.on('add-favourite', actionHandlerGenerator('favourites', 'add-favourite'));
        eventSource.on('delete-favourite', actionHandlerGenerator('favourites', 'delete-favourite'));
        serviceRegistration.registerService('uas-gateway', config.port, function (err, success) {
            if (success) {
                console.log('Registered uas-gateway with consul');
            }
        });
    });
});

