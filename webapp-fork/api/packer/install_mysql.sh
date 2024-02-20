#!/bin/bash
sudo yum update -y
sudo yum install -y mysql-server
sudo systemctl enable mysqld.service
sudo systemctl start mysqld.service
