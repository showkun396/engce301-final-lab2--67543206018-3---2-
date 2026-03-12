# ENGCE301 Final Lab 2

## Gateway Strategy & Architecture (Cloud)

This repository implements a microservices architecture using an API Gateway (`nginx`) to route traffic to independent backend services.

### Architecture Components
1. **API Gateway (Nginx)**
   - Acts as a reverse proxy. Returns 429 for rate-limited traffic and redirects HTTP to HTTPS.
   - Routes `/api/auth/` traffic to **auth-service**.
   - Routes `/api/tasks/` traffic to **task-service**.
   - Routes `/api/users/` traffic to **user-service**.
   - Routes `/api/logs/` traffic to **log-service**.

2. **Auth Service (`auth-service`) + `postgres-auth` Database**
   - Handles `POST /api/auth/register` and `POST /api/auth/login`.
   - Returns a JWT token with `username`, `email`, and `role` packed inside.
   - Manages the `users` table including password hashing with `bcrypt`.

3. **Task Service (`task-service`) + `postgres-task` Database**
   - Handles Task CRUD (`GET/POST/PUT/DELETE /api/tasks`).
   - Validates the incoming JWT with the shared `JWT_SECRET`. If invalid/missing, returns 401.
   - Operates on its own `tasks` table without foreign keys joining to the external `users` table.

4. **User Service (`user-service`) + `postgres-user` Database**
   - Handles Profile management (`GET/PUT /api/users/profile`).
   - Validates the incoming JWT with the shared `JWT_SECRET`. If invalid/missing, returns 401.
   - Operates on its own `user_profiles` table.

### Security
All backend services share the same `JWT_SECRET` in environment variables.

## Cloud Deployment (Railway) URLs
- Auth Service: `[YOUR_AUTH_URL]`
- Task Service: `[YOUR_TASK_URL]`
- User Service: `[YOUR_USER_URL]`
- Nginx Gateway: `[YOUR_NGINX_URL]`