# Use your custom base image with Node and Nginx
FROM 010438506924.dkr.ecr.ap-south-1.amazonaws.com/base-image:latest

# Set working directory
WORKDIR /app

# Create a system user for Nginx (optional but clean)
RUN useradd -r nginx \
    && rm -rf /var/lib/apt/lists/*

# Copy dependency files and install Node packages
COPY package*.json ./
RUN npm install

# Copy application files and .env
COPY . .

# Copy Nginx configuration files
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf

# Set port and expose it
ENV PORT=3000
EXPOSE 80

# Start both Node.js and Nginx — wait ensures errors stop container
CMD ["sh", "-c", "node index.js & wait $! && nginx -g 'daemon off;'"]
