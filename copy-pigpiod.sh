mkdir /home/pi/systemd;
cd /home/pi/systemd;
wget -O pigpiod.service https://raw.githubusercontent.com/nrbrt/node-red-contrib-t2abv/master/pigpiod.service;
sudo cp /home/pi/systemd/pigpiod.service /lib/systemd/system/pigpiod.service;
sudo chown root:root /lib/systemd/system/pigpiod.service;
cd /home/pi;
rm -r /home/pi/systemd;
sudo systemctl daemon-reload;
sudo systemctl restart pigpiod;
