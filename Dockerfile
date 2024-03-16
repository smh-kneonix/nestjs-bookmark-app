# Base image
FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install


# Bundle app source
COPY . .

RUN npx prisma generate

COPY prisma ./prisma/

# Expose the port on which the app will run
EXPOSE 3030

# Start the server using the production build
CMD ["npm", "run", "start"]