FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

COPY prisma /app/prisma/
COPY .env /app/

COPY . /app/

RUN npm install
RUN npx prisma generate
RUN npx prisma migrate deploy

CMD ["npm", "start"]
