#!/bin/bash

cd /
sudo dnf install unzip -y
sudo mkdir -p /opt/webapp/webapp-fork/api
sudo unzip /tmp/webapp.zip -d /opt/webapp/webapp-fork/api/
cd /opt/webapp/webapp-fork/api
sudo npm install

#create .env
echo "DB_PASSWORD=root" | sudo tee .env
echo "DB_HOST=localhost" | sudo tee .env
echo "DB_DATABASE=Health" | sudo tee .env
echo "DB_USERNAME=root" | sudo tee .env
echo "PORT=8080" | sudo tee .env