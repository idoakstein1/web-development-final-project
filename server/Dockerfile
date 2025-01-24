FROM node:16-alpine

WORKDIR /home/st111/WatchIt/server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
