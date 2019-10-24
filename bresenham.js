module.exports = function(RED) {
    function BresenhamNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {

          var regmax = 100; //amount of powerlevels
          var regvalue = msg.payload; //required powerlevel

          var regerror = (this.context.regerror||0) - regvalue;

          if (regerror <= 0){
            this.context.regerror = regerror+regmax;
            msg.payload = 1;
            node.send(msg);
          }else{
            this.context.regerror = regerror;
            msg.payload = 0;
            node.send(msg);
          }

        });
      }
      RED.nodes.registerType("Bresenham",BresenhamNode);
}
