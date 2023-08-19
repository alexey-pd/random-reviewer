FROM node:20.5.1

ENV PNPM_VERSION=8.6.12
ENV PNPM_HOME="/pnpm"

RUN corepack enable
RUN corepack prepare pnpm@$PNPM_VERSION --activate
