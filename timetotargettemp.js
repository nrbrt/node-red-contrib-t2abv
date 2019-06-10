module.exports = function(RED) {
    function TimeToTargetTNode(config) {
        RED.nodes.createNode(this,config);
        this.targettemp = config.targettemp;
	var node = this;
	var nodeContext = this.context();
        node.on('input', function(msg) {
            
	    if(msg.topic === 'targettemp'){
		nodeContext.set('targettemp', msg.payload);
	    }
	    var target = node.targettemp;
	    if(nodeContext.get('targettemp')){
		target = nodeContext.get('targettemp');
	    }

	    var lastboilertemp = nodeContext.get('lastboilertemp')||0;
	    var currenttemp = msg.payload;

	    if(msg.topic === 'temperature' && lastboilertemp === 0){
		nodeContext.set('lastboilertemp', currenttemp);
	    }
	    
	    if(msg.topic === 'temperature' && lastboilertemp !== 0){
		var deltaTemp = currenttemp - lastboilertemp;

		nodeContext.set('lastboilertemp', currenttemp);
		var result = Math.round((60/deltaTemp)*(target - currenttemp));
		
		if(result < 0){
		    msg.payload = 0;
		    this.status({fill:"green",shape:"dot",text:"time left "+msg.payload+" seconds"});

		}
		if(result >= 0 && result < 36000){
		    msg.payload = result;
		    this.status({fill:"green",shape:"dot",text:"time left "+msg.payload+" seconds"});
		    
		}		
        	node.send(msg);
    	    }    
        });
    }
    RED.nodes.registerType("TimeToTargetT",TimeToTargetTNode);
}