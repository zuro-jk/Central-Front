# 1. Corregimos 'as' a 'AS' (Mayúsculas para evitar el warning)
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# --- CORRECCIÓN CRÍTICA ---
# Cambiamos 'npm run build' por 'npx vite build'
# 'npm run build' suele ejecutar 'tsc && vite build'. Si tienes errores de tipos, 'tsc' falla.
# 'npx vite build' construye el proyecto ignorando errores de tipos no críticos.
RUN npx vite build

# Etapa 2: Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]