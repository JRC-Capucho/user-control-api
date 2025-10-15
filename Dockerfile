FROM node:22.20.0-alpine3.21 AS dependency

WORKDIR /app

COPY package.json .

RUN npm i -g pnpm && pnpm i

FROM node:22.20.0-alpine3.21 AS build

WORKDIR /app

COPY --from=dependency /app/node_modules /app/node_modules
COPY . .

RUN npm i -g pnpm && pnpm build

FROM node:22.20.0-alpine3.21 AS prod

WORKDIR /app

RUN npm i -g pnpm

COPY --from=build /app/dist /app/dist
COPY --from=dependency /app/node_modules /app/node_modules
COPY --from=dependency /app/package.json /app/package.json

EXPOSE 3333

CMD [ "pnpm", "start:prod" ]


# docker run --name user-control-api -e DATABASE_HOST=db -e DATABASE_PORT="5432" -e DATABASE_USERNAME="docker" -e DATABASE_PASSWORD="docker" -e DATABASE_NAME="user-control" -e DATABASE_SCHEMA="public" -e NODE_ENV="dev" -e PORT="3333" -e JWT_SECRET='secret' -e JWT_EXPIRES_IN='1d' --network user-control-api_default user-control-api
