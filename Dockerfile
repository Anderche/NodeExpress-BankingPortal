FROM node:10.1-alpine

WORKDIR /app

ADD ./package.json .

RUN npm install

COPY . .

CMD ["npm", "start"]
