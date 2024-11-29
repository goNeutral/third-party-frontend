FROM node:18-alpine

WORKDIR /usr/dashboard

COPY ./package.json ./package.json

COPY . .

RUN yarn install



CMD ["yarn", "dev"]