FROM node:latest

RUN mkdir -p /indexer
ADD ./index.js /indexer/index.js
ADD ./package.json /indexer/package.json

RUN cd /indexer && \
    npm install --quiet

WORKDIR /indexer

CMD node /indexer/index.js; bash
