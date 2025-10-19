FROM node:20
WORKDIR /app

# Copiar package.json do backend
COPY backend/package*.json ./backend/

# Instalar dependências do backend dentro do container Linux
RUN cd backend && npm install --build-from-source

# Copiar todo o backend e frontend
COPY backend/frontend ./backend/frontend

# Build TypeScript
RUN cd backend && npm run build

EXPOSE 4000

CMD ["node", "backend/dist/index.js"]
