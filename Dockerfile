FROM node:20-alpine3.20
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
ENV NODE_ENV=development
ENV PORT=8000
ENV DB_HOST=postgres
ENV DB_USERNAME=postgres
ENV DB_PASSWORD=password
ENV DB_PORT=5432
ENV DB_DATABASE=hydrosat_db
ENV ADMIN_NAME=hydrosat
ENV ADMIN_PASSWORD=hydrosat
ENV USER_PASSWORD=password
ENV JWT_SECRET=hydrosat
ENV GOOGLE_APPLICATION_CREDENTIALS=/app/nlp.json
EXPOSE 8000
CMD ["yarn", "dev"]
