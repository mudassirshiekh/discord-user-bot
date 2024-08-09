# First step: Install dependecies
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json .
RUN npm install

# Second step: Copy source code and build app
COPY . .
RUN npm run build

# Three step: Copy builded app and install dependencies
FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/package*.json ./
# RUN npm install --production


CMD ["node", "./dist/bundle.js"]