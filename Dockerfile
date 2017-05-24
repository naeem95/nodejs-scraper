FROM node:7.10.0

# Create app directory
RUN mkdir -p /usr/src/dvf-scraper
WORKDIR /usr/src/dvf-scraper

# Install app dependencies
COPY package.json /usr/src/dvf-scraper/
RUN npm install

# Bundle app source
COPY . /usr/src/dvf-scraper

# Launch app
CMD [ "npm", "start" ]
