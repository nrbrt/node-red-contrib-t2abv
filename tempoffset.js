module.exports = function(RED) {
    function TempOffsetNode(config) {
        RED.nodes.createNode(this,config);
        this.contextglobalvariable = config.contextglobalvariable;
        var node = this;
        node.on('input', function(msg) {
            var offset = this.context().global.get(this.contextglobalvariable)||0;
            var temp = parseFloat(msg.payload);
	    msg.payload = temp + offset;
            node.send(msg);
        });
    }
    RED.nodes.registerType("TempOffset",TempOffsetNode);
}