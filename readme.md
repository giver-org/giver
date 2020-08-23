# Getting Started

Use the `docker-compose.yml` file and `npm run start` script to startup the project.

# Database setup notes

Database connection settings are in `ormconfig.json`.

Remember to create dir for docker volume to persist postgres data: `mkdir -p ~/docker/volumes/postgres`

If it is your first time running the postgres container with a specified volume directory, postgres will require an env var `POSTGRES_PASSWORD` set to create the superuser password. If you enter it wrong, or want to reset it, you can delete the volume directory and start fresh: `docker run --name postgres --rm -d -p 5432:5432 -e POSTGRES_PASSWORD=docker -v ~/docker/volumes/postgres:/var/lib/postgresql/data postgres`
