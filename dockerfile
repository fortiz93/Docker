# Stage 1: Build / Instalar dependencias de producción
FROM node:20-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Runtime final
FROM node:20-alpine
WORKDIR /usr/src/app
ENV NODE_ENV=production

# Copiar dependencias y código de la app
COPY package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY . .

# Seguridad: ejecutar con un usuario sin privilegios de root
USER node

EXPOSE 3000
CMD ["node", "index.js"]