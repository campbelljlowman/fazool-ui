FROM node:18

WORKDIR /usr/src/fazool-ui 

COPY package.json . 
RUN npm i 

COPY . .

EXPOSE 5173 

CMD ["npm", "start"]