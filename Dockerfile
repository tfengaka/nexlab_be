FROM node:18-alpine3.17

WORKDIR /app

COPY package*.json .
COPY yarn.lock .
COPY /vendor ./vendor

RUN yarn install
RUN chown -R node:node /app/node_modules

COPY . /app
CMD ["yarn", "dev"]

EXPOSE 8000
