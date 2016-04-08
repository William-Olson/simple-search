### repo_collector

Simple data gatherer program for github & bitbucket 
repo data. Repos collected belong to (or are forked by) 
either me or people I follow.

Collects repo information through github and bitbucket
api, filters it, and then outputs it to a JSON file.

#### Pre-Setup

**Linux**

Make sure you have libssl-dev. Ubuntu users can run:

```
sudo apt-get install libssl-dev
```

**Mac**

Mac should already have libssl by default.


**Windows**

Please follow the same requirements as [rust-openssl][rsossl]
(the [rust-hyper][hyper] library causes this dependency).


#### Run

```
cargo run
```


#### Docker

If you have docker installed you can use the `build.sh` script for 
building an image and `run.sh` for running it.

[rsossl]: https://github.com/sfackler/rust-openssl#windows
[hyper]: https://github.com/hyperium/hyper
