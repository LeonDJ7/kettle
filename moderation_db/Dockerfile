FROM node:current-alpine3.12

WORKDIR /usr/app
COPY package.json .
RUN npm install --quiet
COPY . .
CMD ["npm", "start"]