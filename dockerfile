FROM node:22-slim

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run generate
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
