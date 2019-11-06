module.exports = function(RED) {
    function TtoRGBNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
          const Gradient = require('gradient2')
          var arr=[];

          if(msg.topic == "start_color"){
            this.context().global.set("rgb_start_color", msg.payload);
          }

          if(msg.topic == "end_color"){
            this.context().global.set("rgb_end_color", msg.payload);
          }

          if(msg.topic == "temperature" && this.context().global.get("rgb_start_color") != undefined && this.context().global.get("rgb_end_color") != undefined){
            var gradient = new Gradient({
            colors: [
              { color: JSON.parse("[" + this.context().global.get("rgb_start_color") + "]"), pos: 0},
              { color: JSON.parse("[" + this.context().global.get("rgb_end_color") + "]"), pos: 80}
            ],
            steps: 80,
            model: 'rgb'
            })
            gradient.__cache.forEach(function(element){
              var result = element.color.map(function (x) {
                           return Math.round(x);
                           });
              arr.push(result);
            });

            if(Number(msg.payload) <= 21){
              msg.payload = arr[0];
              node.send(msg);
            }else{
              msg.payload = arr[Number(msg.payload) - 21];
              node.send(msg);
            }
          }
        });
      }
      RED.nodes.registerType("TtoRGB",TtoRGBNode);
}
