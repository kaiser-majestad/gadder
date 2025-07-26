#!/bin/sh
# Espera hasta que la base de datos esté disponible
echo "⏳ Esperando base de datos en $DB_HOST:$DB_PORT..."
while ! nc -z $DB_HOST $DB_PORT; do
  sleep 1
done
echo "✅ Base de datos disponible. Arrancando backend..."
exec "$@"
