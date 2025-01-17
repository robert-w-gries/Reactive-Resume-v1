## build image
FROM node:13.12.0-alpine as build

## set working directory
WORKDIR /usr/src/app

## add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

## install and cache app dependencies
COPY package.json /usr/src/app/package.json

## install git
RUN apk add --no-cache git

## install app dependencies
RUN npm install

## copy files
COPY . /usr/src/app

## build production app
RUN npm run build

## production environment
FROM nginx:1.17.9-alpine

## copy build artifacts to nginx
COPY --from=build /usr/src/app/build /usr/share/nginx/html

## copy custom nginx config
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

## run nginx server
CMD sed -i -e 's/ENV_PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'