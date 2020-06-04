Startup docker postgres container on linux after downloading the postgres image:

To connect to my docker db:

```bash
docker run --rm  --name pg-docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres
pgcli -h localhost -p 5432 -U postgres
```

