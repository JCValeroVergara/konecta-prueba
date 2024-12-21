
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

# Instalar dockerize para esperar a la base de datos
RUN apk add --no-cache curl && \
    curl -sSL https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz | tar -xz -C /usr/local/bin

# Comando de inicio, usando dockerize para esperar la base de datos
CMD ["dockerize", "-wait", "tcp://db:5432", "-timeout", "60s", "npm", "start"]