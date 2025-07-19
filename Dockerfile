
FROM node:18-alpine


WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Install nodemon globally (for dev)
RUN npm install -g nodemon

# Default command
CMD ["nodemon", "server.js"]
