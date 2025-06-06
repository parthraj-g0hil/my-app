# Dockerfile

FROM 010438506924.dkr.ecr.ap-south-1.amazonaws.com/base-image:latest

WORKDIR /app

# Install Node dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Copy Nginx configuration files
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf

# Set port and expose it
ENV PORT=3000
EXPOSE 80

# Start app and Nginx
CMD bash -c "node index.js & nginx -g 'daemon off;'"
