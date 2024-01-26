FROM node:18

WORKDIR /server
COPY package*.json ./
RUN npm i
COPY . ./
EXPOSE 4008
CMD ["npm", "start"]
