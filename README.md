## UserControl

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Structure

```
src/
├── domain/
│   ├── entities/
│   │   └── user.entity.ts
│   ├── interfaces/
│   │   └── user.repository.interface.ts
├── application/
│   ├── use-cases/
│   │   ├── create-user/
│   │   │   └── create-user.use-case.ts
│   │   ├── get-user/
│   │   │   └── get-user.use-case.ts
├── infrastructure/
│   ├── database/
│   │   ├── repositories/
│   │   │   └── user.repository.impl.ts
│   │   └── database.module.ts
│   ├── config/
│   │   └── environment.ts
├── interfaces/
│   ├── http/
│   │   ├── controllers/
│   │   │   └── user.controller.ts
│   │   ├── dtos/
│   │   │   └── create-user.dto.ts
│   │   └── user.module.ts
├── shared/
│   └── errors/
│       └── custom-error.ts
├── main.ts
└── app.module.ts
```


## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

