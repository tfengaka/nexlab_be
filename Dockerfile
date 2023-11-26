FROM node:18-alpine3.17 AS builder

WORKDIR /module
COPY package*.json .
COPY yarn.lock .
COPY /vendor ./vendor
RUN yarn install

FROM node:18-alpine3.17 AS production

WORKDIR /app
COPY --from=builder /module/node_modules ./node_modules
COPY . /app

CMD ["yarn", "dev"]
EXPOSE 8000
