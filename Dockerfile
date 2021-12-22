FROM node:14.15-alpine

RUN apk update && \
    apk add --no-cache curl git && \
    npm install -g expo-cli

WORKDIR /app
