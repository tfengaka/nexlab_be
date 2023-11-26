FROM node:18-alpine3.17 

WORKDIR /usr/src/app

COPY package*.json .
COPY /vendor ./vendor

RUN npm ci --production
COPY . /usr/src/app

EXPOSE 8000
CMD ["npm", "run", "dev"]
