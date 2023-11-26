FROM node:18-alpine3.17

WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json .
COPY yarn.lock .
COPY vendor ./vendor
# Install dependencies (do this before copying the application code to take advantage of Docker layer caching)
RUN yarn install

# Copy the application code to the container
COPY . .

# Expose the port your app runs on
EXPOSE 8000

# Specify the command to run your application
CMD ["yarn", "dev"]
