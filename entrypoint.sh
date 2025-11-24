#!/bin/sh
set -e

if [ -n "${DATABASE_HOST}" ]; then
  echo "Waiting for database..."
  until PGPASSWORD=${DATABASE_PASSWORD} psql -h ${DATABASE_HOST} -U ${DATABASE_USER} -d ${DATABASE_NAME} -c '\q' 2>/dev/null; do
    >&2 echo "PostgreSQL is unavailable - sleeping"
    sleep 2
  done
  echo "Database is ready!"
fi

python manage.py migrate --noinput
python manage.py collectstatic --noinput

exec gunicorn gazpromorgchart.wsgi:application --bind 0.0.0.0:8000 --workers 3
