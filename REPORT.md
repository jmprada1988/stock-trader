# Technical Report: NestJS API Architecture

## Overview

This project follows the NestJS standard modular architecture. It exposes a RESTful API, provides Swagger documentation, integrates with external services, and includes robust scheduling, event-driven features, and detailed logging.

## Key Decisions and Patterns

### ✅ CRUD with `@dataui/crud`
To avoid repetitive controller and service logic for basic resources, we leveraged `@dataui/crud`. This generates routes and handles sorting, pagination, and filtering by default. Custom endpoints are extended where necessary.

### ✅ Event-Driven Architecture
`@nestjs/event-emitter` is used to decouple features. Instead of importing services directly, domain events are dispatched and handled only by listeners that need them. This reduces coupling and makes it easier to extend the app.

### ✅ Axios Interceptors for Secrets
All third-party integrations are funneled through a central integration layer. Axios interceptors are used to inject API keys or headers securely, avoiding leakage or repeated logic in modules.

### ✅ Scheduler for Periodic Tasks
`@nestjs/schedule` is used for cron jobs (e.g., syncing with Fuse API). Jobs are placed inside a `scheduler/` module and properly registered via `ScheduleModule`.

### ✅ Logging with Winston
All logs go through the Winston logger setup. This allows JSON-formatted logs for production and colorized output for local development. Different levels (debug, info, warn, error) are used throughout the code.

### ✅ Swagger and API Docs
Clear API documentation is generated with `@nestjs/swagger`. DTOs, validation, and route descriptions are included for easy onboarding of consumers or QA teams.

## Deployment Considerations

- Uses Docker for local development and CI/CD compatibility
- Database readiness ensured via `wait-for-it.sh` pattern in entrypoint
- Environment variables set via `.env` or `docker-compose.yml`
- Prepared for horizontal scaling due to modular decoupling

---

This design ensures a scalable, maintainable, and secure backend API that can evolve with minimal changes across modules.
