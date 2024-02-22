#!/bin/bash

sudo sh -c 'cat << EOF > /etc/systemd/system/webapp.service
[Unit]
Description=Node.js Application
After=network.target

[Service]
ENVIRONMENT=DB_PASSWORD='root'
ENVIRONMENT=DB_HOST='localhost'
ENVIRONMENT=DB_DATABASE='Health'
ENVIRONMENT=DB_USERNAME='root'
ENVIRONMENT=PORT='8080'
Type=simple
User=csye6225
Group=csye6225
WorkingDirectory=/opt/webapp/
ExecStart=/usr/bin/node /opt/webapp/webapp-fork/api/index.js
Restart=on-failure
RestartSec=3

[Install]
WantedBy=multi-user.target
EOF'
