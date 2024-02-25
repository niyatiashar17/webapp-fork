

npm install (node_modules)  
 //change the folder name in index.js file
"../new_name/src/router/router"
add : "start": "nodemon index.js" in scripts
npm install dotenv --save (env read)
npm install express --save (express package)
npm install nodemon --save (package.json)
npm install body-parser --save
npm install sequelize --save

//Google cloud setup
// curl https://sdk.cloud.google.com | bash

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
