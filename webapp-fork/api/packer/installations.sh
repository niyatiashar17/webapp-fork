#!/bin/bash

cd /
sudo dnf install unzip -y
sudo mkdir -p /opt/webapp/webapp-fork/api
sudo unzip /tmp/webapp.zip -d /opt/webapp/webapp-fork/api/
cd /opt/webapp/webapp-fork/api
sudo npm install