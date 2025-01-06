FROM node:22

WORKDIR /Realestate

COPY . /Realestate/

RUN npm install --legacy-peer-deps

CMD [ "npm" , "start" ]