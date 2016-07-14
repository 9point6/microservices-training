var nitroRetriever = require('../nitro-retriever');

module.exports = function (request, response) {
    console.log('get-nitro-asset', request.params.pid);
    var asset = nitroRetriever.getAssetFromPid(request.params.pid);

    if (!asset) {
        return response.status(404).send({error: 'asset not found'});
    }
    response.send(asset);
};
