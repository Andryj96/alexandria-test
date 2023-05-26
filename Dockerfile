FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma/

COPY start.sh ./
COPY start-test.sh ./
COPY . .

# Execution perm
RUN chmod +x ./start.sh
RUN chmod +x ./start-test.sh

RUN npm install
