#!/bin/bash

cd /
sudo dnf install unzip -y
sudo unzip /tmp/webapp.zip -d /home/packer/webapp/
cd /home/packer/webapp/
sudo npm install
sudo touch .env
echo "MYSQL_HOSTNAME=localhost" | sudo tee -a .env
echo "MYSQL_PASSWORD=Jaishreekrishna@1998" | sudo tee -a .env
echo "MYSQL_DATABASENAME=assignment04" | sudo tee -a .env
echo "MYSQL_USERNAME=root" | sudo tee -a .env
