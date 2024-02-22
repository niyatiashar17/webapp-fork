#!/bin/bash

cd /
sudo dnf install unzip -y
sudo unzip /tmp/webapp.zip -d /home/packer/webapp/webapp/
sudo npm install
sudo touch .env
echo "DB_HOST=localhost" | sudo tee -a .env
echo "DB_PASSWORD=Jaishreekrishna@1998" | sudo tee -a .env
echo "DB_DATABASE=assignment04" | sudo tee -a .env
echo "DB_USERNAME=root" | sudo tee -a .env
