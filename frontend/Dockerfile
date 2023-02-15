###
## FRONT END DOCKERFILE
###

FROM node:lts-alpine

COPY ./     /app/

WORKDIR /app

RUN npm install
RUN npm install -g @angular/cli
RUN ng update
RUN npm update

ENTRYPOINT ng serve 3000
