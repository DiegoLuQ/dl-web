# Usar una imagen base oficial de Nginx ligera
FROM nginx:alpine

# Copiar nuestra configuración personalizada de Nginx para que sea la principal
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar los archivos HTML y CSS al directorio raíz de Nginx
COPY ./html /usr/share/nginx/html

# Exponer el puerto 80 (Nginx escucha en este puerto por defecto)
EXPOSE 80

# Comando para iniciar Nginx cuando el contenedor arranque
CMD ["nginx", "-g", "daemon off;"]