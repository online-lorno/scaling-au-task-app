# frontend/Dockerfile

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

# Build the Next.js application
RUN pnpm run build

# Stage 2: Serve the application
FROM node:20-alpine

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Install production dependencies
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --prod

# Copy built application from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/package.json ./

# Expose the port the app runs on
EXPOSE 3000

# Environment variables
ENV NODE_ENV=production

# Start the Next.js application
CMD ["pnpm", "start"]