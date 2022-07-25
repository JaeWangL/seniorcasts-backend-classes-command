FROM node:16-alpine AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json yarn.lock .env ./
COPY prisma ./prisma/

# Install app dependencies
RUN yarn install
RUN yarn prisma generate

COPY . .

RUN yarn build

FROM node:16-alpine

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env ./

EXPOSE 8080
CMD [ "yarn", "start" ]
