# Use your custom base image with Node and Nginx
FROM 010438506924.dkr.ecr.ap-south-1.amazonaws.com/base-image:latest

# Set working directory
WORKDIR /app

# Only create nginx user if it doesn't exist
RUN id -u nginx 2>/dev/null || useradd -r nginx && rm -rf /var/lib/apt/lists/*

# Copy dependency files and install Node packages
COPY package*.json ./
RUN npm install

# Copy app source and config files
COPY . .

COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf

# Set environment and expose port
ENV PORT=3000
EXPOSE 80

# Start Node.js app and Nginx
CMD ["sh", "-c", "node index.js & wait $! && nginx -g 'daemon off;'"]
