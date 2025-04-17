# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Install pnpm
ARG PNPM_VERSION=8
RUN npm install -g pnpm@${PNPM_VERSION}

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies with exact versions from lockfile
RUN pnpm install --frozen-lockfile

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Install pnpm
ARG PNPM_VERSION=8
RUN npm install -g pnpm@${PNPM_VERSION}

# Copy package files needed for install
COPY package.json pnpm-lock.yaml ./

# Install dependencies within the builder stage
RUN pnpm install --no-frozen-lockfile

# Copy the rest of the application code
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Add build arguments for Firebase configuration
# These can be passed during build with --build-arg
ARG NEXT_PUBLIC_FIREBASE_API_KEY
ARG NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
ARG NEXT_PUBLIC_FIREBASE_PROJECT_ID
ARG NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
ARG NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
ARG NEXT_PUBLIC_FIREBASE_APP_ID
ARG MONGODB_URI
ARG NEXT_PUBLIC_ENABLE_DEBUG_LOGGING

# Add build arguments for Firebase Admin SDK
ARG FIREBASE_ADMIN_PRIVATE_KEY
ARG FIREBASE_ADMIN_PROJECT_ID
ARG FIREBASE_ADMIN_CLIENT_EMAIL

# Map build arguments to environment variables for the build process
ENV NEXT_PUBLIC_FIREBASE_API_KEY=${NEXT_PUBLIC_FIREBASE_API_KEY}
ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=${NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}
ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID=${NEXT_PUBLIC_FIREBASE_PROJECT_ID}
ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=${NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}
ENV NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=${NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}
ENV NEXT_PUBLIC_FIREBASE_APP_ID=${NEXT_PUBLIC_FIREBASE_APP_ID}
ENV MONGODB_URI=${MONGODB_URI}
ENV NEXT_PUBLIC_ENABLE_DEBUG_LOGGING=${NEXT_PUBLIC_ENABLE_DEBUG_LOGGING}

# Map Firebase Admin SDK variables
ENV FIREBASE_ADMIN_PRIVATE_KEY=${FIREBASE_ADMIN_PRIVATE_KEY}
ENV FIREBASE_ADMIN_PROJECT_ID=${FIREBASE_ADMIN_PROJECT_ID}
ENV FIREBASE_ADMIN_CLIENT_EMAIL=${FIREBASE_ADMIN_CLIENT_EMAIL}

# --- Enhanced debugging for Firebase module issues ---
RUN echo "--- Verifying pnpm install in builder stage ---"
RUN pnpm list firebase # Check if firebase is listed by pnpm
RUN echo "--- Detailed node_modules listing ---"
RUN find node_modules -name "firebase" -type d | sort
RUN find node_modules -path "*/firebase/app*" | sort
RUN find node_modules -path "*/firebase/auth*" | sort
RUN echo "--- Package resolution verification ---"
RUN cat node_modules/.pnpm/firebase@*/node_modules/firebase/package.json || echo "Firebase package.json not found"
RUN ls -la node_modules/.pnpm/firebase* || echo "No firebase packages in .pnpm directory"
RUN echo "--- Checking module structure ---"
RUN find node_modules/firebase -type f -name "*.js" | head -10 || echo "No JS files in firebase module"
RUN echo "--- Verifying tsconfig.json ---"
RUN cat tsconfig.json
RUN echo "--- Checking import paths ---" 
RUN find . -type f -name "*.ts" -o -name "*.tsx" | xargs grep -l "firebase" | head -5
RUN echo "--- Verifying Env Vars before build ---"
RUN printenv | grep NEXT_PUBLIC_FIREBASE || echo "Firebase Env Vars not found"
RUN echo "--- Attempting manual resolution of firebase module ---"
RUN node -e "try { require.resolve('firebase/app'); console.log('firebase/app can be resolved'); } catch(e) { console.log('ERROR: firebase/app cannot be resolved:', e.message); }"
RUN node -e "try { require.resolve('firebase/auth'); console.log('firebase/auth can be resolved'); } catch(e) { console.log('ERROR: firebase/auth cannot be resolved:', e.message); }"
RUN echo "--- End Enhanced Debugging ---"

# Build the application
RUN pnpm build

# Stage 3: Runner (Production)
FROM node:20-alpine AS runner
WORKDIR /app

# Set environment variables for runtime
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Pass environment variables from builder stage (will be set by Azure Web App at runtime)
# These comments help document what env vars need to be configured in Azure
# ENV NEXT_PUBLIC_FIREBASE_API_KEY=...
# ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
# ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
# ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
# ENV NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
# ENV NEXT_PUBLIC_FIREBASE_APP_ID=...
# ENV MONGODB_URI=...
# ENV FIREBASE_ADMIN_PRIVATE_KEY=...
# ENV FIREBASE_ADMIN_PROJECT_ID=...
# ENV FIREBASE_ADMIN_CLIENT_EMAIL=...
# ENV NEXT_PUBLIC_ENABLE_DEBUG_LOGGING=true

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy only necessary files from builder - standalone output structure
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set correct ownership
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose the port the app runs on
EXPOSE 3000

# Set hostname to listen on all interfaces
ENV HOSTNAME="0.0.0.0"

# Command to run the application
CMD ["node", "server.js"] 