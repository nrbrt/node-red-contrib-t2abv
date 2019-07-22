module.exports = function(RED) {
    function TtoVaporABVNode(config) {
        RED.nodes.createNode(this,config);
        this.sensortype = config.sensortype;
	var node = this;
	var nodeContext = this.context();
        node.on('input', function(msg) {
            if(msg.topic === 'temperature'){
		
		nodeContext.set('temperature', msg.payload);
	    }
	    
	    if(msg.topic === 'pressure'){
		nodeContext.set('pressure',  msg.payload);
	    }
	    
	    var temperature = Number(nodeContext.get('temperature'))||0;
	    var pressure = Number(nodeContext.get('pressure'))||0;

	    if(temperature && pressure){
		if(node.sensortype === "smt172"){
		    var abv = require('ttoabv');
		    var result = abv.TtoVaporABV(abv.correctedH2O(temperature,pressure));
		    if(result < 0){
			msg.payload = -1;
		    } else {
			msg.payload = result;
		    }
        	    this.status({fill:"green",shape:"dot",text:"smt172 "+msg.payload+"% ABV"});
        	    node.send(msg);
		}
		if(node.sensortype === "ds18b20"){
		    var abv = require('ttoabv/TtoABV_DS18B20');
		    var result = abv.TtoVaporABV(temperature,pressure);
		    if(result < 0){
			msg.payload = -1;
		    } else {
			msg.payload = result;
		    }
		    this.status({fill:"green",shape:"dot",text:"ds18b20 "+msg.payload+"% ABV"});
        	    node.send(msg);
		}
	    }
        });
    }
    RED.nodes.registerType("TtoVaporABV",TtoVaporABVNode);
}