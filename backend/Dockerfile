FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port (adjust if your backend uses a different port)
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
