FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma/
COPY .env ./
COPY start.sh ./
COPY . .

RUN npm install

CMD ["/bin/sh", "start.sh"]
