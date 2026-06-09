FROM node:22-alpine AS base
RUN npm install -g pnpm@10

# ---- deps ----
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --config.minimumReleaseAge=0

# ---- builder ----
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production

ARG PUBLIC_SANITY_PROJECT_ID
ARG PUBLIC_SANITY_DATASET
ARG PUBLIC_IUBENDA_SITE_ID
ARG PUBLIC_IUBENDA_COOKIE_POLICY_ID
ARG PUBLIC_LEADSY_PID
ARG PUBLIC_SCRIPTINTEL_TAG_URL
ARG PUBLIC_KORE_API_KEY
ARG PUBLIC_GTM_ID
ARG PUBLIC_RB2B_KEY
ENV PUBLIC_SANITY_PROJECT_ID=$PUBLIC_SANITY_PROJECT_ID \
    PUBLIC_SANITY_DATASET=$PUBLIC_SANITY_DATASET \
    PUBLIC_IUBENDA_SITE_ID=$PUBLIC_IUBENDA_SITE_ID \
    PUBLIC_IUBENDA_COOKIE_POLICY_ID=$PUBLIC_IUBENDA_COOKIE_POLICY_ID \
    PUBLIC_LEADSY_PID=$PUBLIC_LEADSY_PID \
    PUBLIC_SCRIPTINTEL_TAG_URL=$PUBLIC_SCRIPTINTEL_TAG_URL \
    PUBLIC_KORE_API_KEY=$PUBLIC_KORE_API_KEY \
    PUBLIC_GTM_ID=$PUBLIC_GTM_ID \
    PUBLIC_RB2B_KEY=$PUBLIC_RB2B_KEY

RUN pnpm run build

# ---- runner ----
FROM nginx:alpine AS runner

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
