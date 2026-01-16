# Project Description

This project is a web application that allows users to register, login, and manage their profile. The application is built using Node.js, Express.js, and MySQL. The application is deployed on GCP using Terraform and Packer.

# Project setup Commands

```
npm i
```

# Run Project

```
Dev command: npm run dev
Prod command: npm run start
Test command: npm run test
```

# Sql start/stop command

```
run cmd as administrator
net start MySQL80
net stop MySQL80
```
# Swagger Documentation

```
http://localhost:8888/api-docs/csye6225-webapp
```

# Commands to test API

To test database health

```
curl -i -X POST \
-H "Content-Type:application/json" \
-d '{"first_name":"Niyati","last_name":"Ashar","password": "Karan@api123","username":"ashar.n@northeastern.edu"}' \
http://localhost:8888/v1/user/
```

#Project Description

npm install (node_modules)  
 //change the folder name in index.js file
"../new_name/src/router/router"
add : "start": "nodemon index.js" in scripts
npm install dotenv --save (env read)
npm install express --save (express package)
npm install nodemon --save (package.json)
npm install body-parser --save
npm install sequelize --save


const { version } = require("winston")

//Setting up infrastructure using Terraform

////Install Terraform
brew tap hashicorp/tap
brew install hashicorp/tap/terraform
brew update
brew upgrade hashicorp/tap/terraform
terraform -help
terraform -help plan
// (if error in terraform check PATH, Please go back and ensure that your PATH variable contains the directory where Terraform was installed.)
touch ~/.bashrc
terraform -install-autocomplete
exec $SHELL (Once the autocomplete support is installed, you will need to restart your shell)
// //Install Docker
open -a Docker
mkdir learn-terraform-docker-container
cd learn-terraform-docker-container
create main.tf
terraform init
terraform apply
terraform destroy

////EC2 INSTANCE ON AWS
https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target /
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg ./AWSCLIV2.pkg -target /
which aws
aws --version
