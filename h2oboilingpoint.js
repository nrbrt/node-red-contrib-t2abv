var abv = require('ttoabv');
module.exports = function(RED) {
    function h2oBoilingPointNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            var pressure = parseFloat(msg.payload);
	    msg.payload = abv.h2oBoilingPoint(pressure);
            node.send(msg);
        });
    }
    RED.nodes.registerType("h2oBoilingPoint",h2oBoilingPointNode);
}