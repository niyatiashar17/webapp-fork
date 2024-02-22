#!/bin/bash

sudo sh -c 'cat << EOF > /etc/systemd/system/webapp.service
[Unit]
Description=Node.js Application
After=network.target

[Service]
Type=simple
User=csye6225
Group=csye6225
ENVIRONMENT=DB_PASSWORD='$DB_PASSWORD'
ENVIRONMENT=DB_HOST='$DB_HOST'
ENVIRONMENT=DB_DATABASE='$DB_DATABASE'
ENVIRONMENT=DB_USERNAME='$DB_USERNAME'
ENVIRONMENT=PORT='$PORT'
WorkingDirectory=/opt/webapp/webapp-fork/api
ExecStart=/usr/bin/node /opt/webapp/webapp-fork/api/index.js
Restart=on-failure
RestartSec=3
StandardOutput=append:/var/log/webapp_output.log
StandardError=append:/var/log/webapp_error.log

[Install]
WantedBy=multi-user.target
EOF'
