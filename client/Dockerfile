# Base image
FROM node:22.11.0-slim

WORKDIR /web-development-final-project/client

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "preview"]
