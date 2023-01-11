FROM node:17

WORKDIR /usr/src/my-health-frontend

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]