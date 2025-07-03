# 1. Используем Node.js образ для сборки фронта
FROM node:18-alpine AS build

# 2. Указываем рабочую директорию
WORKDIR /app

# 3. Копируем package.json и устанавливаем зависимости
COPY package.json package-lock.json ./
RUN npm install

# 4. Копируем весь код и собираем React-приложение
COPY . .
RUN npm run build

# 5. Используем Nginx для раздачи фронта
FROM nginx:stable-alpine

# 6. Копируем файлы из папки build в Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# 7. Открываем порт 80
EXPOSE 5173

# 8. Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
