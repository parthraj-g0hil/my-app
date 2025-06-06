FROM node:18 as node-build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

FROM node:18

WORKDIR /app
COPY --from=node-build /app /app

RUN apt-get update && apt-get install -y nginx \
    && useradd -r nginx \
    && rm -rf /var/lib/apt/lists/*

# Replace proper nginx configs
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
ENV PORT=3000

CMD bash -c "node index.js & nginx -g 'daemon off;'"
