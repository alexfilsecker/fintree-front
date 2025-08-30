FROM node:lts

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY src ./src
COPY tsconfig.json ./tsconfig.json
COPY tailwind.config.ts ./tailwind.config.ts