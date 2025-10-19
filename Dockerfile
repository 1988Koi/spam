FROM node:20

# Define diretório de trabalho
WORKDIR /app

# Copia apenas o package.json e package-lock.json do backend
COPY backend/package*.json ./backend/

# Instala dependências do backend
RUN cd backend && npm install --build-from-source

# Copia todo o backend e frontend
COPY backend ./backend
COPY frontend ./frontend

# Build do TypeScript
RUN cd backend && npm run build

# Expõe a porta
EXPOSE 4000

# Start do backend
CMD ["node", "backend/dist/index.js"]
