# backend/Dockerfile

# Stage 1: Build the application
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN npm run build

# Stage 2: Run the application
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy built application from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Generate Prisma client
RUN npx prisma generate

# Copy Prisma migration scripts
COPY --from=builder /app/prisma/migrations ./prisma/migrations

# Expose the port the app runs on
EXPOSE 3001

# Environment variables
ENV NODE_ENV=production

# Run database migrations and start the server
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]