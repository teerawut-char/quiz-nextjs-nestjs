FROM node:24-alpine AS builder

WORKDIR /app


COPY package*.json ./
COPY prisma ./prisma/


RUN npm install


COPY . .


ENV DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"


# Generate Prisma client
RUN npx prisma generate --schema ./prisma/schema


RUN npm run build

FROM node:24-alpine

WORKDIR /app
RUN apk add --no-cache redis

ENV DATABASE_URL=postgresql://user:p@ssword@ticket-booking-postgres:5432/ticket_booking_db?schema=public
ENV REDIS_URL=redis://ticket-booking-redis:6379
ENV PORT=3001
ENV JWT_SECRET=U5Kux9p3aGQ/kKpTXqyEDqQOdOLLxjlnHLGxPDT63yQ=

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts

EXPOSE 3001


CMD redis-cli -h ticket-booking-redis flushall && \
    npx prisma db push --schema ./prisma/schema --accept-data-loss && \
    npx prisma db seed --schema ./prisma/schema && \
    node dist/src/main.js
