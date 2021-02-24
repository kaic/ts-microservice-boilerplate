#!/bin/sh

echo "start_server_prod.sh starting..."

#build ts code
echo "buildind project..."
npm run build

#run server
echo "starting server for production..."
npm run start:production