
FROM node:6.3.0

RUN apt-get install libstdc++6

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./package.json /usr/src/app/
RUN npm install

COPY ./bin /usr/src/app/bin
COPY ./lib /usr/src/app/lib
COPY ./fake-nitro.json /usr/src/app/

CMD [ "npm", "run", "nitro" ]
