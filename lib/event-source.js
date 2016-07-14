var rabbit = require('rabbit.js');
var context = rabbit.createContext();
var publish = context.socket('PUB');
var subscribe = context.socket('SUB');
var serviceName;

module.exports.init = function (srvName, callback) {
    serviceName = srvName;
    context.on('ready', function() {
      subscribe.connect('events', function() {
        publish.connect('events', function() {
            callback();
        });
      });
    });
};

module.exports.emit = function (eventName, params) {
    publish.write(JSON.stringify({
        eventName: eventName,
        params: params || {},
        timestamp: Date.now(),
        service: serviceName
    }));
};

module.exports.on = function (eventName, callback) {
    subscribe.on('data', function (data) {
        var event = JSON.parse(data);
        if (event.eventName === eventName) {
            callback(event.params);
        }
    });
};
