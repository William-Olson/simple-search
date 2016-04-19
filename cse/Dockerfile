FROM node:latest

ENV TERM xterm
ENV DEBUG "cse"

RUN mkdir -p /site/server

ADD ./server/ /site/server
COPY ./client/ /site/client
COPY ./package.json /site/
COPY ./bower.json /site/
COPY ./gulpfile.js /site/
COPY ./.bowerrc /site/
COPY ./.jshintrc /site/

WORKDIR /site

RUN npm install -g --quiet gulp
RUN npm install -g --quiet nodemon
# RUN npm install -g --quiet bower

RUN npm install --quiet && \
	gulp pro 

# RUN bower install --allow-root

CMD nodemon /site/server/bin/www
