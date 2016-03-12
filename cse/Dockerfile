FROM node

ADD ./server/ /site/

WORKDIR /site

ENV TERM xterm

ENV DEBUG "cse"

RUN npm install -g gulp && \
	npm install -g nodemon

EXPOSE 3333

CMD nodemon /site/bin/www
