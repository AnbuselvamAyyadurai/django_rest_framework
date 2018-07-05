#!/bin/bash

echo "==> Removing all data from the database..."
#python manage.py flush --noinput

echo "==> Loading user fixtures..."
python manage.py loaddata core/fixtures/users.json

echo "==> Loading snippets fixtures..."
python manage.py loaddata core/fixtures/snippets.json

echo "==> Done!"
