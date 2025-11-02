#!/bin/bash

echo "Starting DDEV..."
ddev start --skip-hooks

echo "Setting up root environment variables..."
ddev exec cp .env.example .env

echo "Setting up frontend environment variables..."
ddev fe cp .env.example .env

echo "Installing Composer packages and setting up Craft CMS..."
ddev composer install --no-scripts && ddev craft setup/keys

echo "Installing Node packages"
ddev npm install

echo "Launching Craft Control Panel..."
ddev launch admin && ddev launch

echo "Start Dev Process"
ddev npm run dev

echo "Automatic Setup complete! Go ahead and import a database with 'ddev import-db'"
