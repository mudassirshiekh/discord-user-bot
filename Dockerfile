# First step: Install dependecies
FROM node:22-alpine
WORKDIR /app
COPY package*.json .

RUN npm install --production
RUN npx modclean -r

COPY . .

CMD ["npm", "run", "start"]