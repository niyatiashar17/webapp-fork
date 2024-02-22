#!/bin/bash

sudo sh -c 'cat << EOF > /etc/systemd/system/webapp.service
[Unit]
Description=Node.js Application
After=network.target

[Service]
ENVIRONMENT=DB_PASSWORD='$DB_PASSWORD'
ENVIRONMENT=DB_HOST='$DB_HOST'
ENVIRONMENT=DB_DATABASE='$DB_DATABASE'
ENVIRONMENT=DB_USERNAME='$DB_USERNAME'
ENVIRONMENT=PORT='$PORT'
Type=simple
User=csye6225
Group=csye6225
WorkingDirectory=/opt/webapp/
ExecStart=/usr/bin/node /opt/webapp/index.js
Restart=on-failure
RestartSec=3

[Install]
WantedBy=multi-user.target
EOF'
