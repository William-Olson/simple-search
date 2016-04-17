## Windows


If you wish to build and run on a Windows machine,
you can install Docker natively on your machine and try
to build and run the project with... 

```bash
docker-compose up -d
```

The app will be accessible at `http://192.168.99.100/cse`.

However, don't expect the `build.sh` script to work. 

Installing and working with Docker is a bit of a pain _**on Windows**_. 
It takes a while getting it setup correctly, and lots of annoying things
like incompatible terminal emulators, permissions, environment variables, paths,
among others makes the experience not very nice on Windows.

If you want to try Docker natively, go right ahead. I was able to get the app
up and running on Windows with native Docker, but the experience was not as nice
as my proposed solution below for running on Windows.

## My Proposed Setup

From my experience, it is much nicer to
just create a linux VM with docker installed on it and just
work inside the VM.  For this reason I recommend using 
vagrant to automate setup/teardown of the docker VM.

So...

There is a `Vagrantfile` provided for Windows users.

This will create a VM that has docker & docker-compose
installed on it, and can be used for building & running the app.
It also pulls base images used in the project from the docker hub registry
as part of the provisioning process.

#### Requirements

* [**Vagrant**][vagrant]
* [**Virtualbox**][vb]
* **A Shell with SSH** ([Cygwin][cygwin], [MinGW][msys], or [Putty][putty])

_Note: If using **Putty**, you will need to ssh into localhost on port `2200`.
Vagrant should show you what port it forwards port `22` to
in the `vagrant up` process, so double check it is `2200`._

## Using Vagrant

Make sure you can perform the simplest commands with vagrant
before continuing. Try the following...

```bash
mkdir ~/tmp-test && cd ~/tmp-test

vagrant init hashicorp/precise64

vagrant up --provider=virtualbox

vagrant ssh
```

If you were able to get the box booted up & could ssh into it,
then you are good to go. Otherwise, try installing Windows Service Pack
Updates or Visual C++ tools (If you have visual studio installed
you should have them already).

You can kill the temp box with the destroy command...

```bash
vagrant destroy
```

## Build & Run the App

**1) Build the VM**

Clone this repo (or download it) and cd into its directory.
Then run...

```bash
vagrant up
```

This should take some good time. Go make some coffee or something
while you wait `=)`.

**2) Build the App**

SSH into the VM you just built...

```bash
vagrant ssh
```

Change to the `simple_search` directory and build the app...

```bash

# the repo's directory is synced in the vm
cd ./simple_search

# build the containers
docker-compose build

```

More waiting `=)`

**3) Run the App**

Now we can start up the containers (this should be instant)...

```bash

# run the containers
docker-compose up -d

# follow the logs (optional)
docker-compose logs -f

```

**4) Restarting**

If you want to shut it down and boot it again later then...

```bash

# exit the VM
exit

# gracefully shut down the VM
vagrant halt

# -- at a later time --

# reboot it
vagrant up

# ssh in
vagrant ssh

# restart the app
cd ./simple_search && docker-compose up -d && docker-compose logs -f

```


[vagrant]: https://www.vagrantup.com/downloads.html
[vb]: http://virtualbox.org
[cygwin]: http://cygwin.org
[msys]: http://www.mingw.org/wiki/MSYS
[putty]: http://www.putty.org/
