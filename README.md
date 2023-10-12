# Auction-IT

## Dev-enviroment

### database

If you do not have Postgressql installed or no docker image you can spin up with

```
docker run --name auctionit-postgres -e POSTGRES_PASSWORD=laravel -d postgres
```

( just make sure Docker/Docker Desktop is installed and running on the computer )

### backend and frontend
To start up local web-server and frontend (Vite) with HMR:

```
php artisan serve && npm run vite
```

... then you can visit: http://localhost:8000/
