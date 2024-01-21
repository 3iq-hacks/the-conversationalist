FROM node:20-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

FROM base AS builder
COPY package.json pnpm-lock.yaml /app/
RUN pnpm install --frozen-lockfile

COPY . /app
RUN pnpm run build

FROM base as runner

ENV NODE_ENV production

COPY package.json pnpm-lock.yaml /app/
RUN pnpm install --frozen-lockfile --prod

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

COPY .env.production /app/.env.production

EXPOSE 3000
ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

CMD [ "pnpm", "start" ]
