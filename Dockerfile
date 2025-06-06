# Use base image with Node and Nginx
FROM 010438506924.dkr.ecr.ap-south-1.amazonaws.com/base-image:latest

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application source
COPY . .

# Copy Nginx config
COPY conf/nginx.conf /etc/nginx/nginx.conf
COPY conf/default.conf /etc/nginx/conf.d/default.conf

# Expose port (Nginx will serve on 80)
EXPOSE 80

# Start Node app and Nginx
CMD ["bash", "-c", "node index.js & nginx -g 'daemon off;'"]
