FROM node:22.11.0-slim

WORKDIR /server

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]
