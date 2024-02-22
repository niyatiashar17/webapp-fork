#!/bin/bash
sudo yum update -y
sudo yum install -y mysql-server
sudo systemctl start mysqld
sudo systemctl enable mysqld
echo "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '$DB_PASSWORD'; FLUSH PRIVILEGES; CREATE DATABASE assignment04;" | sudo mysql
