FROM node:22

WORKDIR /Realestate

COPY . /Realestate/

RUN npm install

CMD [ "npm" , "start" ]