module.exports = function(RED) {
    function TempOffsetNode(config) {
        RED.nodes.createNode(this,config);
        this.contextglobalvariable = config.contextglobalvariable;
	this.messageproperty = config.messageproperty;
        var node = this;
        node.on('input', function(msg) {
            var offset = this.context().global.get(this.contextglobalvariable)||0;
            var temp = parseFloat(msg[this.messageproperty]||0);
	    msg.payload = Number(temp) + Number(offset);
            node.send(msg);
        });
    }
    RED.nodes.registerType("TempOffset",TempOffsetNode);
}