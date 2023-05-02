FROM node as builder
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
RUN npm run build

FROM node
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --production

COPY --from=builder /usr/app/dist ./dist

COPY DB.json ./database.json
COPY .env ./

EXPOSE 4000
CMD node dist/src/app.js
