FROM node:20
COPY . /blogserver

WORKDIR /blogserver

RUN npm ci
RUN npm run build

CMD node dist/index.js
