#!/bin/bash

git branch dockerize
git checkout dockerize

# .dockerignore
echo "node_modules" > .dockerignore
echo "dist" >> .dockerignore

# nginx-custom.conf
cat > nginx-custom.conf << EOF
server { 
  listen       *:80;
  location / { 
    root /usr/share/nginx/html;
    index index.html index.html;
    try_files \$uri \$uri/ /index.html; 
  }
}
EOF

# dockerfile 
cat > dockerfile << EOF
FROM node:alpine as builder
WORKDIR /usr/app
COPY ./package*.json ./
RUN npm install

COPY ./ ./
COPY src src
RUN npm run build

FROM nginx:alpine
COPY --from=builder /usr/app/dist/$1 /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
EOF

rm -f package-lock.json
rm -f main.js
rm -f yarn.lock

