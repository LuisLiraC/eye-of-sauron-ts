FROM node:12.18.4

RUN mkdir -p /home/app
WORKDIR /home/app
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
# Copy the main application.
COPY ./ ./
CMD [ "npm","run","dev"]