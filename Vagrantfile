# -*- mode: ruby -*-
# vi: set ft=ruby :

#$script: provisioning shell script (global variable)
$script = <<SCRIPT
  apt-get update
  apt-get install -y tree
SCRIPT

#using vagrant API v2
Vagrant.configure(2) do |config|

  #provider settings
  config.vm.provider "virtualbox" do |v|
    v.memory = 2048
    v.name = "ss"
  end

  #use ubuntu-14.04-amd64 base image
  config.vm.box = "ubuntu/trusty64"

  #expose port 80 of vm. Access it from localhost:8080.
  config.vm.network "forwarded_port", guest: 80, host: 8080

  #docker settings
  config.vm.provision "docker",
    images: ["node:latest",
             "nginx:latest",
             "scorpil/rust:nightly",
             "elasticsearch:2.3"]

 #run provision $script
 config.vm.provision "shell", inline: $script
  
  #renaming the box
  config.vm.hostname = "ss"
  config.vm.define "ss" do |ss|
  end

end
