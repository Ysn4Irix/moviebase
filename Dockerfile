FROM --platform=arm64 node:14-alpine
ARG DEP_URL=${DEP_URL}
ENV DEP_URL=${DEP_URL}
ARG TMDB_API_URL=${TMDB_API_URL}
ENV TMDB_API_URL=${TMDB_API_URL}
ARG TMDB_API_KEY=${TMDB_API_KEY}
ENV TMDB_API_KEY=${TMDB_API_KEY}
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build && npm prune --production
ENV HOST 0.0.0.0
ENV PORT 3000
EXPOSE 3000
CMD ["npm", "start"]
