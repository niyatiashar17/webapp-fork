#!/bin/bash

cd /
sudo dnf install unzip -y
sudo mkdir -p /opt/webapp/
sudo unzip /tmp/webapp.zip -d /opt/webapp/
sudo mkdir -p /var/log/webapp/
cd /opt/webapp/
sudo npm install