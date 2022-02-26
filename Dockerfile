FROM node:16-alpine

WORKDIR /src

# Copy and download dependencies
COPY package.json ./

COPY yarn.lock ./

RUN yarn

COPY . .

EXPOSE 4000

RUN yarn run dev