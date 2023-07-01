FROM node:alpine as builder
WORKDIR /usr/app
COPY ./package*.json ./
RUN npm install

COPY ./ ./
COPY src src
RUN npm run build

FROM nginx:alpine
COPY --from=builder /usr/app/dist/stock-searcher-frontend /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
