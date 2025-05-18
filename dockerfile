# Usar una imagen base oficial de Nginx ligera
FROM nginx:alpine

# Eliminar la configuración por defecto de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiar nuestra configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/

# Copiar los archivos HTML y CSS al directorio raíz de Nginx
COPY ./html /usr/share/nginx/html

# Exponer el puerto 80 (Nginx escucha en este puerto por defecto)
EXPOSE 80

# Comando para iniciar Nginx cuando el contenedor arranque
CMD ["nginx", "-g", "daemon off;"]