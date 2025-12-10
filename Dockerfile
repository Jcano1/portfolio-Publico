# Imagen base con PHP y Apache
FROM php:8.4-apache

# ==========================
# 🔹 Instalar dependencias del sistema
# ==========================
RUN apt-get update && apt-get install -y \
    git unzip curl libpng-dev libjpeg-dev libfreetype6-dev libonig-dev libzip-dev zip gnupg ca-certificates \
 && rm -rf /var/lib/apt/lists/*

# ==========================
# 🔹 Instalar Node.js 20.x (compatible con Vite)
# ==========================
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
 && apt-get install -y nodejs \
 && corepack enable \
 && corepack prepare pnpm@9.12.2 --activate \
 && npm install -g npm@10.8.2 \
 && rm -rf /var/lib/apt/lists/*

# ==========================
# 🔹 Instalar extensiones PHP necesarias
# ==========================gi
RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl gd

# ==========================
# 🔹 Configurar Apache
# ==========================
RUN a2enmod rewrite \
 && sed -i 's/AllowOverride None/AllowOverride All/g' /etc/apache2/apache2.conf \
 && sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

# ==========================
# 🔹 Copiar el proyecto
# ==========================
WORKDIR /var/www/html
COPY . .

# ==========================
# 🔹 Instalar dependencias frontend y build Vite (build limpio)
# ==========================
RUN rm -rf node_modules package-lock.json pnpm-lock.yaml yarn.lock \
 && pnpm install --no-frozen-lockfile \
 && pnpm rebuild esbuild rollup \
 && rm -rf public/build node_modules/.vite \
 && chmod +x node_modules/.bin/vite \
 && pnpm run build

# ==========================
# 🔹 Instalar Composer y dependencias Laravel
# ==========================

RUN curl -sS https://getcomposer.org/installer | php \
 && php composer.phar install --no-dev --optimize-autoloader \
 && php artisan key:generate || true \
 && php artisan optimize:clear || true \
 && php artisan optimize || true

# ==========================
# 🔹 Base de datos SQLite (si aplica)
# ==========================
RUN mkdir -p database \
 && chown -R www-data:www-data storage bootstrap/cache database \
 && chmod -R 775 storage bootstrap/cache database

# ==========================
# 🔹 Exponer puerto y comando final
# ==========================
EXPOSE 443
CMD ["apache2-foreground"]
