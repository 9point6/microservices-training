var uasAdapter = require('../uas-adapter');

var actionMap = {
    favourites: {
        'add-favourite': 'addToUserList',
        'delete-favourite': 'deleteFromList'
    },
    follows: {
        'add-favourite': 'addToUserList',
        'delete-favourite': 'deleteFromList'
    }
};

function executeAction(listType, actionName, userName, pid) {
    var list = uasAdapter(listType);
    if (!actionMap[listType]) {
        throw new Error('Unknown list type: ' + listType);
    }

    var methodToRun = actionMap[listType][actionName];
    if (!methodToRun) {
        throw new Error('Unknown action "' + actionName + '" for list type "' + listType + '"');
    }

    list[methodToRun](userName, pid);
}

module.exports = function (request, response) {
    var listType = request.params.listType;
    var actionName = request.params.action;
    var userName = request.params.user;
    var pid = request.params.pid;

    console.log('update-uas-list', listType, actionName, userName, pid);

    try {
        executeAction(listType, actionName, userName, pid);
        response.send({success: true});
    } catch (error) {
        response.status(400).send({error: error.message});
    }
};
