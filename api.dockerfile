FROM node:latest
MAINTAINER Julio Cesar Lemos De Freitas

ENV PORT=3001
COPY . /var/www

WORKDIR /var/www

RUN npm install -g npm@7.16.0
RUN npm install
# RUN npx sequelize db:migrate

ENTRYPOINT npm run dev
EXPOSE $PORT





