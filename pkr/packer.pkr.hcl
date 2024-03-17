packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = ">= 1.0.0"
    }
  }
}
variable "credentials" {}
variable "project_id" {}
variable "DB_HOST" {}
variable "DB_PASSWORD" {}
variable "DB_DATABASE" {}
variable "DB_USERNAME" {}
variable "PORT" {}

source "googlecompute" "autogenerated_1" {
  credentials_file  = var.credentials
  image_description = "Custom image with application and MySQL"
  image_labels = {
    built_by = "packer"
  }
  image_name   = "csye-centos8"
  network      = "default"
  project_id   = var.project_id
  source_image = "centos-stream-8-v20240110"
  ssh_username = "packer"
  zone         = "us-east1-d"
}

build {
  sources = ["source.googlecompute.autogenerated_1"]

  provisioner "shell" {
    inline = [
      "sudo setenforce 0"
    ]
  }


  provisioner "file" {
    source      = "/home/runner/work/webapp/webapp/webapp.zip"
    destination = "/tmp/webapp.zip"
  }

  provisioner "shell" {
    scripts = ["./install_nodejs.sh", "./install_mysql.sh", "./installations.sh", "./service.sh", "./permission.sh", "./install_ops_agent.sh"]
    environment_vars = [
      "DB_HOST=${var.DB_HOST}",
      "DB_PASSWORD=${var.DB_PASSWORD}",
      "DB_DATABASE=${var.DB_DATABASE}",
      "DB_USERNAME=${var.DB_USERNAME}",
      "PORT=${var.PORT}",
    ]
  }

}
