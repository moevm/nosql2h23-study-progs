FROM node:18

WORKDIR /client
COPY package*.json ./
RUN npm i
COPY . ./
EXPOSE 4007
CMD ["npm", "start"]