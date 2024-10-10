# frontend/Dockerfile

# Stage 1: Build the application
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Serve the application
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy built application from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/package.json ./

# Expose the port the app runs on
EXPOSE 3000

# Environment variables
ENV NODE_ENV=production

# Start the Next.js application
CMD ["npm", "start"]