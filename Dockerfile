FROM node:20

WORKDIR /root

COPY . .

RUN npm install

CMD ["node", "main.js"]
