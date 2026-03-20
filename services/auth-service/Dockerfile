FROM node:22-bullseye-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY services/auth-service/package.json ./services/auth-service/package.json
COPY packages/shared/package.json ./packages/shared/package.json
RUN npm install --workspaces --include-workspace-root

FROM node:22-bullseye-slim AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/package-lock.json ./package-lock.json
COPY tsconfig.base.json ./
COPY packages/shared ./packages/shared
COPY services/auth-service ./services/auth-service
RUN npm run build -w @lms/shared && npm run build -w @lms/auth-service

FROM node:22-bullseye-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/services/auth-service/dist ./dist
COPY --from=build /app/services/auth-service/package.json ./package.json
COPY --from=build /app/services/auth-service/prisma ./prisma
COPY --from=build /app/packages/shared ./packages/shared
COPY --from=deps /app/node_modules ./node_modules
EXPOSE 4001
CMD ["node", "dist/index.js"]
