
# Simple Search

This app provides both _local_ & _web_ search. You can toggle
which search to use & configure features in the _options
menu_.

#### Web Search

Uses google api to provide google search capability.  Allows
marking up to 5 relevant results and re-ranking the results.

#### Local Search

Uses Elasticsearch to index data from a json file. 
The json file is created during the build process
by the program in the data directory. Each indexed
document represents a _repo_ and contains an _owner_,
_name_, & _description_ among other fields that can be
searched.


## Building & Running

##### Windows

See [Windows Readme][bbwin] file.

##### Mac & Linux

  **Requirements**

  * [Docker][docker]
  * [Docker-Compose][dockerc]
  * Docker-Machine - _Mac Only (installed with docker)_



For Mac, make sure you have your host docker
machine running and active...

```bash

# create it
docker-machine create --driver virtualbox host

# make it active
eval "$(docker-machine env host)"


# view its address, use this instead of http://localhost
# you might need to add the ip your /etc/hosts file too.
docker-machine ls

```

#### Running the App

You can use the `build.sh` script for running
the app...

```bash
./build.sh
```

It will be available at `http://localhost/cse` for Linux, or
`http://ip/cse` for Mac, where ip is the host machine's ip address.


## Dev Stuff

#### TODO

 * **Checklist**
   * Matched Term Preprocessing
     * local: search / indexing
     * web: search / reranking
   * Write Up

[bbwin]: src/master/WINDOWS.md
[ghwin]: WINDOWS.md
[docker]: https://docs.docker.com/engine/installation/
[dockerc]: https://docs.docker.com/compose/install/
