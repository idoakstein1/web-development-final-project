# Base image
FROM node:22.11.0-slim

ARG HTTPS_KEY
ARG HTTPS_CERT

ENV HTTPS_KEY=$HTTPS_KEY
ENV HTTPS_CERT=$HTTPS_CERT

WORKDIR /client

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "preview"]
