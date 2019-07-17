module.exports = function(RED) {
    function PowerLevelNode(config) {
        RED.nodes.createNode(this,config);
        this.gpionumber = config.gpionumber;
	this.frequency = config.frequency;
        var node = this;
        node.on('input', function(msg) {
            var execSh = require('exec-sh');
	    var power = Number(msg.payload) * 10000;
	    var freq = this.context().global.get(this.frequency)||0;
	    var gpio = this.context().global.get(this.gpionumber)||0;

	    execSh("pigs hp "+ gpio + " " + freq + " " + power, true, function(err, stdout, stderr){
    		if(err){node.log("error: "+ err);}
    		if(stdout){node.log("stdout: "+ stdout);}
    		if(stderr){node.log("stderr: "+ stderr);msg.error = stderr;}
		node.send(msg);
	    });
        });
    }
    RED.nodes.registerType("PowerLevel",PowerLevelNode);
}