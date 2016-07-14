var fs = require('fs');
var fakeNitro = JSON.parse(fs.readFileSync('fake-nitro.json', 'utf8'));

module.exports.getAssetFromPid = function (pid) {
    return fakeNitro[pid];
};
