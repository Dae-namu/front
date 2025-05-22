# 1단계: build
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# 2단계: serve
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

# nginx 404 fallback for React Router
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
