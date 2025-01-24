# Base image
FROM node:22.11.0-slim

WORKDIR /home/st111/WatchIt/client

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["npm", "start"]
