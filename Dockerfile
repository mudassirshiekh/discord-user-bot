# First step: Install dependecies
FROM node:20 AS builder
WORKDIR /app
COPY package*.json .
RUN npm install

# Second step: Copy source code and build app
COPY . .
RUN npm run clean\
    && npm run build

# Three step: Copy builded app and install dependencies
FROM node:20
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm install --production


CMD ["node", "./dist/index.js"]