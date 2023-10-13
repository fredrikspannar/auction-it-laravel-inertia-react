# Auction-IT

## Dev-enviroment

### database

If you do not have Postgressql installed or no docker image you can spin up with

```
docker run --name auctionit-postgres -e POSTGRES_PASSWORD=laravel -d postgres
```

( just make sure Docker/Docker Desktop is installed and running on the computer )

#### database artisan commands

To migrate a database:

```
php artisan migrate
```

To refresh a migration with seeding of dummy data:

```
php artisan migrate:refresh --seed
```

### backend and frontend
To start up backend:

```
php artisan serve
```

To start react frontend:

```
npm run dev
```

You probably need to run backend and frontend in two different prompts/terminal tabs

... then you can visit: http://localhost:8000/
