# -*- mode: ruby -*-
# vi: set ft=ruby :

#$script: provisioning shell script (global variable)
#installs docker-compose & tree, & creates symbolic link
$script = <<SCRIPT
  export DEBIAN_FRONTEND=noninteractive
  apt-get update
  curl -s -L https://github.com/docker/compose/releases/download/1.7.0/docker-compose-Linux-x86_64 > /usr/local/bin/docker-compose
  chmod +x /usr/local/bin/docker-compose
  apt-get install -y tree
  ln -s /vagrant /home/vagrant/simple_search
SCRIPT

#using vagrant API v2
Vagrant.configure(2) do |config|

  #provider settings
  config.vm.provider "virtualbox" do |v|
    v.memory = 2048
    v.name = "search_vm"
    v.gui = false
  end

  #use ubuntu-14.04-amd64 base image
  config.vm.box = "ubuntu/trusty64"


  #ssh credentials
  config.ssh.username = "vagrant"
  config.ssh.password = "vagrant"

  #expose port 80 of vm. Access app at http://localhost/cse
  #(this port must not already be in use by another service)
  config.vm.network "forwarded_port", guest: 80, host: 80

  # #OR: make VM have a static ip, and add that ip to your hosts file.
  # #(this ip must not already be in use by another machine on the network)
  # config.vm.network "private_network", ip: "192.168.0.80"

  #docker settings
  config.vm.provision "docker",
    images: ["node:latest",
             "nginx:latest",
             "scorpil/rust:nightly",
             "elasticsearch:2.3"]

  #run provision $script
  config.vm.provision "shell", inline: $script
  
  #renaming the box
  config.vm.hostname = "search-vm"
  config.vm.define "search_vm" do |search_vm|
  end

end
