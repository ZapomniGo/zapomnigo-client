FROM node:lts-alpine as builder

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

FROM nginx:stable-alpine as production

ENV NODE_ENV production

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ./data/certs/zapomnigo.crt /etc/nginx/certs/zapomnigo.crt
COPY ./data/certs/zapomnigo.key /etc/nginx/certs/zapomnigo.key

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]