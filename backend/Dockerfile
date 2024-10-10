# Stage 1: Build the application
FROM node:20-alpine AS builder

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml* ./

# Install all dependencies, including dev dependencies
RUN pnpm install

# Copy the entire application code
COPY . .

# Generate Prisma Client
RUN pnpm exec prisma generate

# Build the application
RUN pnpm run build

# Stage 2: Run the application
FROM node:20-alpine

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Expose the port the app will run on
EXPOSE 3001

# Set environment variables
ENV NODE_ENV=production

# Run Prisma db push and start the server
CMD ["sh", "-c", "pnpm exec prisma db push && node dist/main.js"]