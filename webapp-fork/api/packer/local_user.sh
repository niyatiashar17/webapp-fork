#!/bin/bash

# Create a new group
sudo groupadd csye6225

# Create a new user with no login shell
sudo useradd -r -s /usr/sbin/nologin -g csye6225 csye6225
#Command to change the ownership of the artifacts and config
sudo chown -R csye6225:csye6225 /.github/workflows/mysql.yml

sudo chown -R csye6225:csye6225 /.github/workflows/cloud.yml