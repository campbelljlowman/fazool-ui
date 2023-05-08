FROM node:18
LABEL org.opencontainers.image.source=https://github.com/campbelljlowman/fazool-ui

WORKDIR /usr/src/fazool-ui 

COPY package.json . 
RUN npm i 

COPY . .

EXPOSE 5173 

CMD ["npm", "start"]