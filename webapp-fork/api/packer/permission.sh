#!/bin/bash

sudo chmod +x /tmp/install_mysql.sh
sudo chmod +x /tmp/install_nodejs.sh
sudo chmod +x /tmp/installations.sh
sudo useradd -r -s /usr/sbin/nologin -g csye6225 csye6225
sudo chown -R csye6225:csye6225 /home/packer/
sudo cp /home/packer/webapp/webapp.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable webapp.service

