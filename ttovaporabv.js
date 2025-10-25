module.exports = function(RED) {
    function TtoVaporABVNode(config) {
        RED.nodes.createNode(this, config);
        this.sensortype = config.sensortype;
        const node = this;
        const nodeContext = this.context();

        node.on('input', function(msg) {
            // Update context with incoming temperature or pressure readings
            if (msg.topic === 'temperature') {
                nodeContext.set('temperature', msg.payload);
            }

            if (msg.topic === 'pressure') {
                nodeContext.set('pressure', msg.payload);
            }

            // Retrieve stored values - use null as default to distinguish from 0
            const temperature = nodeContext.get('temperature');
            const pressure = nodeContext.get('pressure');

            // Only calculate when both values are available and valid numbers
            // Fixed: Don't use falsy check as 0 is a valid value
            if (temperature !== null && temperature !== undefined &&
                pressure !== null && pressure !== undefined) {

                const tempNum = Number(temperature);
                const pressNum = Number(pressure);

                // Validate that conversion to number succeeded
                if (isNaN(tempNum) || isNaN(pressNum)) {
                    node.warn('Invalid temperature or pressure value');
                    return;
                }

                try {
                    if (node.sensortype === "smt172") {
                        // Use improved local library for SMT172 sensors
                        const abv = require('./lib/TtoABV');
                        const corrected = abv.correctedAzeo(tempNum, pressNum);
                        const result = abv.TtoVaporABV(corrected);

                        if (result < 0) {
                            msg.payload = -1;
                            node.status({fill:"yellow", shape:"ring", text:"smt172 below azeotrope"});
                        } else {
                            msg.payload = Number(result.toFixed(1));
                            node.status({fill:"green", shape:"dot", text:`smt172 ${msg.payload}% ABV`});
                        }
                        node.send(msg);

                    } else if (node.sensortype === "ds18b20") {
                        // Use dependency library for DS18B20 sensors
                        const abv = require('ttoabv/TtoABV_DS18B20');
                        const result = abv.TtoVaporABV(tempNum, pressNum);

                        if (result < 0) {
                            msg.payload = -1;
                            node.status({fill:"yellow", shape:"ring", text:"ds18b20 below azeotrope"});
                        } else {
                            msg.payload = Number(result.toFixed(1));
                            node.status({fill:"green", shape:"dot", text:`ds18b20 ${msg.payload}% ABV`});
                        }
                        node.send(msg);
                    }
                } catch (error) {
                    node.error(`ABV calculation error: ${error.message}`, msg);
                    node.status({fill:"red", shape:"ring", text:"error"});
                }
            }
        });
    }
    RED.nodes.registerType("TtoVaporABV", TtoVaporABVNode);
};