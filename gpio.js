module.exports = function(RED) {
    function GPIONode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            var execSh = require('exec-sh');
	    var inputarray = msg.payload.split(",");
	    if(inputarray.length > 1){
		execSh("pigs w " + inputarray[0] + " " + inputarray[1], true, function(err, stdout, stderr){
		    if(err){node.log("error: "+ err);}
    		    if(stdout){node.log("stdout: "+ stdout);}
    		    if(stderr){node.log("stderr: "+ stderr);msg.error = stderr;node.send(msg);}
		    node.send(msg);
		});
	    }else{
		execSh("pigs r " + inputarray[0], true, function(err, stdout, stderr){
		    if(err){node.log("error: "+ err);}
    		    if(stdout){msg.payload = stdout.replace(/(\r\n|\n|\r)/gm,"");node.send(msg);}
    		    if(stderr){node.log("stderr: "+ stderr);msg.error = stderr;node.send(msg);}
		});
	    }

        });
    }
    RED.nodes.registerType("GPIO",GPIONode);
}