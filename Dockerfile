FROM node:18-alpine3.17

WORKDIR /app

COPY package*.json .
COPY /vendor ./vendor

RUN npm ci
COPY . /app

EXPOSE 8000
CMD ["yarn", "dev"]
