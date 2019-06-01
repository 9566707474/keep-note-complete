FROM node:9.6.1 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
# Stage 2

FROM nginx:alpine
COPY --from=node /app/dist/keep-note-app /usr/share/nginx/html
