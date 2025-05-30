# 1단계: React 앱 빌드
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

# ✅ .env.production 포함하여 전체 소스 복사
COPY . .

# ✅ REACT_APP_API_URL 환경변수를 build 시점에 명시적으로 주입
# 또는 .env.production이 복사되었으면 그대로 동작
RUN npm run build

# 2단계: 정적 파일 서빙
FROM nginx:alpine

# ✅ React 빌드 결과 복사
COPY --from=builder /app/build /usr/share/nginx/html

# ✅ React Router를 위한 fallback 설정 복사
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]