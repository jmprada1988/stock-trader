# NestJS API Service

This project is a standard NestJS-based REST API that includes modular architecture, auto-generated CRUD endpoints, scheduling capabilities, and integration with third-party APIs. The service can be run locally or via Docker.

## 🔧 Local Setup

1. **Install dependencies:**
   ```bash
   yarn install
   ```

2. **Environment Configuration:**

   Create a `.env` file with the following example variables:

   ```
   DATABASE_URL=postgres://nest:secret@localhost:5432/app
   FUSE_API_KEY=your-api-key
   FUSE_API_URL=https://api.challenge.fusefinance.com
   ```

3. **Run the app:**

   ```bash
   yarn run start:dev
   ```

4. **Access the API:**

    - API: http://localhost:3000
    - Swagger Docs: http://localhost:3000/docs

## 🐳 Docker Compose

You can spin up the entire stack using Docker:

```bash
docker-compose up --build
```

Environment variables in `docker-compose.yml` are already pre-filled for testing:

```yaml
DATABASE_URL: postgres://nest:secret@db:5432/app
```

The service will wait for the Postgres container before starting. Logs will show a successful DB connection and server startup.

## 🧪 Testing

```bash
yarn test        # unit tests
yarn test:e2e    # end-to-end tests
yarn test:cov    # coverage report
```

## 📘 Documentation

- Swagger: auto-generated at `/docs`
- Logs: formatted using Winston logger
- Cron Jobs: handled by `@nestjs/schedule`
- Event Bus: via `@nestjs/event-emitter`
- Integration layer: Axios with centralized interceptors for API secrets

## 📁 Folder Structure

- `src/integrations`: external APIs via Axios
- `src/modules`: feature modules
- `src/config`: global configuration, database, crud and validations
- `src/scheduler`: cron jobs
