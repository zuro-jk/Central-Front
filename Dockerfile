FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# --- NUEVO: Recibir la URL del Backend ---
ARG VITE_API_BASE_URL
# Establecerla como variable de entorno para que Vite la lea
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
# -----------------------------------------

# Construir (ahora Vite leerá la variable de arriba)
RUN npx vite build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]