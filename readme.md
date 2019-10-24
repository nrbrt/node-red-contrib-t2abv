A couple of nodes that produce distillation related numbers based on temperature and atmospheric pressure, together with a couple of other nodes
that come in handy when you are automating a still with a Raspberry Pi or otherwise.
The module consists of the following nodes:


h20BoilingPoint: calculates the boilingpoint of water at the current atmospheric pressure.


Azeotrope:  calculates the Azeotrope temperature of ethanol.


TtoLiquidABV: calculates the ABV of a liquid, based on temperature of that liquid and the current atmospheric pressure. Different lookup tables are used for ds18b20 and smt172 sensors (smt172 connected to a seperate nano) and can be defined in the settings.


TtoVaporABV:  does the same for ethanol vapor. Also seperate lookup tables for ds18b20 and smt172 sensors (smt172 connected to a seperate nano).


TimeToTargetT: calculates an estimated time to reach a given temperature, based on a temperature measurement of a liquid every 60s.


TempOffset: calculates an offset compensated temperature, based on a stored global variable or fixed setting and input.


PowerLevel: uses pigpiod to set a hardware pwm signal that corresponds to a certain powerlevel (dutycycle). The frequency can be set in settings or also passed to the input.


GPIO: Dynamic configurable GPIO reader/writer and also uses pigpiod.


Bresenham: Distributes pulses evenly over time, based on the Bresenham algorithm. This can be used to control power with an SSR or for controlling the flow through a solenoid. Analog control for a digital proces.


You might also be interested in a couple of other programs that I wrote for both Raspberry Pi and Arduino, in combination with the above:
smt172-nano-needlevalve: uses a nano to communicate the smt172 temperature data to the Pi and controls a needlevalve mechanism.

smt172-nano-peristalticpump: the same as above, except that it uses a peristaltic pump.

ds18b20-service: I noticed that Node-RED is a bit slow with the temperature measurement, so I wrote a daemon that runs in the background and uses MQTT to communicate the meassurements and hardware addresses of the sensors.

bmp280-service: the same as above, but for a bmp(e)280 atmospheric pressure sensor.


Both the smt172 driver that is used on the Arduino Nano, as the ABV calculation library for the Arduino (ported to Node.js by me) were written by Edwin Croissant.
