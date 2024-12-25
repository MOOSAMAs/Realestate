FROM node:22

WORKDIR /Fitness

COPY . /Fitness//

RUN npm install

CMD [ "npm" , "start" ]