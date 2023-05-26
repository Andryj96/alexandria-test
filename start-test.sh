#!/bin/sh

npx prisma generate
npx prisma migrate deploy
npx jest