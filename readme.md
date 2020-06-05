# How to setup database

`ormconfig.json`: contains database connection info for orm. Note to dylan: don't put prod stuff in here.

To use Docker to host a postgres container:

1. install docker
1. pull postgres image
	1. `docker pull postgres`
1. create dir for docker volume to persist postgres data
	1. `mkdir -p ~/docker/volumes/postgres`
1. run postgres container
	1. `docker run --name postgres --rm -d -p 5432:5432 -e POSTGRES_PASSWORD=docker -v ~/docker/volumes/postgres:/var/lib/postgresql/data postgres`

`-e POSTGRES_PASSWORD=docker`: If it is your first time running the postgres container with a specified volume directory, postgres will require an env var `POSTGRES_PASSWORD` set to create the superuser password. If you enter it wrong, or want to reset it, you can dlete the volume directory and start fresh.
