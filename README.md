# UserControl

### Overview

UserControl is a Node.js application built with NestJS, following the principles of Clean Architecture. It allows system administrators to manage users by creating, editing, viewing, and deleting user records, ensuring each user is assigned an appropriate access level based on their role. This enables fine-grained control over system permissions, aligning with business requirements for secure and role-based access management.

#### Features

- **User Management**: Create, edit, view, and delete users with appropriate access levels.
- **Role-Based Access Control**: Assign roles (e.g., ADMIN, USER, GUEST) to users to control permissions.
- **Clean Architecture**: Organized into Domain, Application, Infrastructure, and Interfaces layers for maintainability and testability.
- **TypeORM Integration**: Persists user data in a database using TypeORM.
- **Password Security**: Passwords are hashed using bcrypt for secure storage.
- **Validation**: Input validation using class-validator to ensure data integrity.

### Project Structure

The project follows Clean Architecture principles, with the following directory structure:
```
src/
├── domain/
│   ├── entities/
│   │   └── user.entity.ts          # Domain entity for User
│   ├── enums/
│   │   └── roles.enum.ts          # Enum for user roles (e.g., ADMIN, USER, GUEST)
│   ├── interfaces/
│   │   └── user.repository.interface.ts  # Repository interface for user persistence
│   │   └── hash.service.interface.ts     # Interface for password hashing
├── application/
│   ├── use-cases/
│   │   ├── create-user/
│   │   │   └── create-user.use-case.ts  # Use case for creating a user
│   │   ├── get-user/
│   │   │   └── get-user.use-case.ts     # Use case for retrieving a user
├── infrastructure/
│   ├── database/
│   │   ├── entities/
│   │   │   └── user.orm-entity.ts       # TypeORM entity for persistence
│   │   ├── repositories/
│   │   │   └── user.repository.impl.ts  # Concrete repository implementation
│   │   └── database.module.ts           # Database configuration module
│   ├── services/
│   │   └── hash.service.ts              # Bcrypt-based hash service
│   ├── config/
│   │   └── environment.ts               # Environment configuration
├── interfaces/
│   ├── http/
│   │   ├── controllers/
│   │   │   └── user.controller.ts       # HTTP controller for user endpoints
│   │   ├── dtos/
│   │   │   └── create-user.dto.ts       # DTO for user creation
│   │   └── user.module.ts               # NestJS module for user-related features
├── shared/
│   └── errors/
│       └── custom-error.ts              # Custom error handling
├── main.ts                                  # Application entry point
└── app.module.ts                            # Root application module
```

## Layer Responsibilities

- **Domain**: Contains entities, enums, and interfaces representing the core business logic, independent of frameworks or external libraries.
- **Application**: Implements use cases that orchestrate business logic, interacting with domain entities and interfaces.
- **Infrastructure**: Provides concrete implementations for database access (TypeORM), password hashing (bcrypt), and environment configuration.
- **Interfaces**: Handles external communication, such as HTTP requests via NestJS controllers and DTOs.

## Prerequisites

- **Node.js**: Version 18 or higher
- **PNPM**: Version 8 or higher
- **Database**: PostgreSQL (or another TypeORM-supported database)
- **Environment Variables**: Create a .env file based on .env.example with database credentials and other configurations.

## Installation
```bash
# Install dependencies
pnpm install
```

## Running the Application
```bash
# Development mode
pnpm run start

# Development mode with watch (auto-reload)
pnpm run dev

# Production mode
pnpm run start:prod
```

## Testing
```bash
# Run unit tests
pnpm run test

# Run end-to-end (e2e) tests
pnpm run test:e2e

# Generate test coverage report
pnpm run test:cov
```

## Environment Configuration
- Create a .env file in the project root with the following variables:
```
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=your-username
DATABASE_PASSWORD=your-password
DATABASE_NAME=your-database
PORT=3333
```
