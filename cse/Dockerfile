FROM node

RUN mkdir -p /site/server

ADD ./server/ /site/server
COPY ./client/ /site/client
ADD ./package.json /site
ADD ./gulpfile.js /site


WORKDIR /site

ENV TERM xterm

ENV DEBUG "cse"

RUN npm install -g gulp && \
	npm install -g nodemon && \
	npm install

RUN gulp pro


CMD nodemon /site/server/bin/www
