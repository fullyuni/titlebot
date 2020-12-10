FROM node:12.13.1
WORKDIR /usr/src/app
COPY package-lock.json ./
RUN npm install

COPY . .
EXPOSE 80

CMD [ "node", "app.js" ]