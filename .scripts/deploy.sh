#!/bin/bash
set -e

echo "Deployment started ..."

# Pull the latest version of the app
git pull origin production

# Install composer dependencies
composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader

# Clear the old cache
php artisan clear-compiled

# Recreate cache
php artisan optimize
php artisan config:cache

# Compile npm assets
npm install
npm run build

# Run database migrations
php artisan migrate --force

# Link storage folder
php artisan storage:link

# ... aaaaand
echo "Deployment finished!"
