# backend/Dockerfile

# Stage 1: Build the application
FROM node:20-alpine AS builder

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml (if you use it)
COPY package.json pnpm-lock.yaml* ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN pnpx prisma generate

# Build the NestJS application
RUN pnpm run build

# Stage 2: Run the application
FROM node:20-alpine

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Install production dependencies
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --prod

# Copy built application from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Generate Prisma client
RUN pnpx prisma generate

# Expose the port the app runs on
EXPOSE 3001

# Environment variables
ENV NODE_ENV=production

# Run database migrations and start the server
CMD ["sh", "-c", "pnpx prisma db push && node dist/main.js"]