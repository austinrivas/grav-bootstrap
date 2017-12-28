#!/usr/bin/env bash
docker pull austinrivas/nginx-php-grav:1.0.0
docker run -d -i -p 80:80 -p 2222:22 -v ~/repos/grav-bootstrap/grav:/usr/share/nginx/html/ -name grav-bootstrap austinrivas/nginx-php-grav:1.0.0