### repo_collector

Simple data gatherer program for github & bitbucket 
repo data. Repos collected belong to (or are forked by) 
either me or people I follow.

Collects repo information through github and bitbucket
api, filters it, and then outputs it to a JSON file.

**Notes**

Requires libssl-dev. (Installed in docker container.)

#### Build & Run with Docker

You can run repo_collector independently with the build
and run scripts provided.

Build it:

```bash
  ./build.sh
```

Run it:

```bash
  ./run.sh
```

