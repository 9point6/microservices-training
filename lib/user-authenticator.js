var fs = require('fs');
var users = fs.readFileSync('users.json', 'utf8');

function validateUser(user) {
    return users.indexOf(user) !== -1;
}

module.exports = function (req, res, next) {
    if (req.params.user && !validateUser(req.params.user)) {
        return response.status(403).send({error: 'Invalid user'});
    }

    next();
};
