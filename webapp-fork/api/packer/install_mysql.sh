#!/bin/bash

sudo dnf install mysql-server -y
sudo systemctl start mysqld.service
sudo systemctl enable mysqld
echo "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'; FLUSH PRIVILEGES; CREATE DATABASE Health;" | sudo mysql