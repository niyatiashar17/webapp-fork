#!/bin/bash

cd /
sudo dnf install unzip -y
sudo mkdir -p /opt/webapp/webapp-fork/api
sudo unzip /tmp/webapp.zip -d /opt/webapp/webapp-fork/api/
cd /opt/webapp/webapp-fork/api
sudo npm install

#create .env
# echo "DB_PASSWORD=$DB_PASSWORD" | sudo tee -a .env
# echo "DB_HOST=$DB_HOST" | sudo tee -a .env
# echo "DB_DATABASE=$DB_DATABASE" | sudo tee -a .env
# echo "DB_USERNAME=$DB_USERNAME" | sudo tee -a .env
# echo "PORT=$PORT" | sudo tee -a .env