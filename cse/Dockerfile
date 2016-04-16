FROM node:latest

RUN mkdir -p /site/server

ADD ./server/ /site/server
COPY ./client/ /site/client
COPY ./package.json /site/
COPY ./bower.json /site/
COPY ./gulpfile.js /site/
COPY ./.bowerrc /site/
COPY ./.jshintrc /site/


WORKDIR /site

ENV TERM xterm

ENV DEBUG "cse"

RUN npm install -g gulp && \
	npm install -g nodemon && \
	npm install -g bower nodemon && \
	npm install && \
	bower install --allow-root

RUN gulp pro


CMD nodemon /site/server/bin/www
