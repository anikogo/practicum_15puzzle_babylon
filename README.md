# practicum_15puzzle_babylon
Yandex Practicum Middle Frontend Developer | Module 2 | Game 15puzzle

## Babylon team

- #### rkkmkkfx
    - Sergey Baranov

    - [GitHub](https://github.com/rkkmkkfx)

- #### bmazurme
    - Bogdan Mazur

    - [GitHub](https://github.com/bmazurme)

### Tech Stack

![TypeScript](https://img.shields.io/badge/-TypeScript-black?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/-React-black?style=flat-square&logo=react)
![Redux](https://img.shields.io/badge/-Redux-black?style=flat-square&logo=redux)
![Heroku](https://img.shields.io/badge/-Heroku-black?style=flat-square&logo=heroku)
![Docker](https://img.shields.io/badge/-Docker-black?style=flat-square&logo=docker)
![Nginx](https://img.shields.io/badge/-Nginx-black?style=flat-square&logo=nginx)
![Nodejs](https://img.shields.io/badge/-Nodejs-black?style=flat-square&logo=Node.js)
![Express](https://img.shields.io/badge/-Express-black?style=flat-square&logo=express)
![Webpack](https://img.shields.io/badge/-Webpack-black?style=flat-square&logo=webpack)
![NPM](https://img.shields.io/badge/-NPM-black?style=flat-square&logo=npm)
![Git](https://img.shields.io/badge/-Git-black?style=flat-square&logo=git)
![Eslint](https://img.shields.io/badge/-Eslint-black?style=flat-square&logo=eslint)

### Installation

Clone the repository on your computer: `git clone ...`

Install dependencies: `npm install`

Launch: `npm start`, dev `npm run dev`

Test: `npm run test`


### MEMORYLEAKS

### .env
create .env in root

```
DB_HOST= #

DB_USER= #

DB_PASSWORD= #

DB_NAME= #
```

### DOCKER

`docker-compose build`

`docker-compose up`

`docker-compose stop`

`docker system prune -a`

`docker-compose build`

`docker compose push`

`docker pull cr.yandex/${REGISTRY_ID}/myapp:latest`

`docker run  cr.yandex/${REGISTRY_ID}/myapp:latest`

[https://cloud.yandex.ru/docs/container-registry/tutorials/run-docker-on-vm#before-begin](https://cloud.yandex.ru/docs/container-registry/tutorials/run-docker-on-vm#before-begin)

`docker exec -it container_ID_or_name /bin/bash`

```
# on an M1 mac…

# --platform linux/amd64
```

Identify what is running in port 5432: `sudo lsof -i :5432`

Kill all the processes that are running under this port: `sudo kill -9 <pid>`

Run the command again to verify no process is running now: `sudo lsof -i :5432`

### NGINX

`sudo apt update`

`sudo apt install -y nginx`

`sudo ufw allow 'Nginx Full'`

`sudo ufw allow OpenSSH`

`sudo ufw enable`

`sudo systemctl enable --now nginx`

`sudo nano /etc/nginx/sites-available/default`

`sudo nginx -t`

`sudo systemctl reload nginx`

#### nginx.conf

### SSH

`ls -al ~/.ssh`

`ssh-add ~/.ssh/id_rsa`

`pbcopy < ~/.ssh/id_rsa.pub`

### SSL

`sudo apt update`

`sudo apt install -y certbot python3-certbot-nginx`

`sudo certbot --nginx`

`sudo systemctl reload nginx`
