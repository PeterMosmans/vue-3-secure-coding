FROM node:lts-alpine as build
ARG API_HOST
ARG API_PORT
WORKDIR /app

# Copy both 'package.json' and 'package-lock.json' (if available)
# This speeds up caching
# COPY npm-shrinkwrap.json ./
COPY package*.json ./
COPY .env.production.local ./
# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
# Note that this could be less
COPY ./ .

# build app for production with minification
RUN npm run build

# RUN rm dist/js/*.map

FROM nginxinc/nginx-unprivileged:1.25 as release
ARG API_HOST
ARG API_PORT
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN sed -i "s/http:\/\/localhost/http:\/\/${API_HOST}/g" /etc/nginx/conf.d/default.conf
RUN sed -i "s/:1200;/:${API_PORT};/g" /etc/nginx/conf.d/default.conf
HEALTHCHECK CMD curl --silent --fail http://localhost:80/ >/dev/null || exit 1
