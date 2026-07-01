# DecodeLabs Task API

**Project 2 — Backend API Development**
Industrial Training Kit | Batch 2026 | DecodeLabs

> "If it isn't documented, it doesn't exist."

A simple, well-documented REST API built with Node.js + Express. This project
demonstrates the core backend skills from Project 2: API endpoints, request
validation, and consistent server responses — the "nervous system" that
connects a frontend to server-side logic.

## Setup

```bash
npm install
npm start
```

The server runs on `http://localhost:3000` by default (override with the
`PORT` environment variable).

## Resource: Task

```json
{
  "id": 1,
  "title": "Design the API endpoints",
  "description": "Plan out GET and POST routes",
  "status": "pending | in-progress | completed",
  "createdAt": "ISO 8601 timestamp"
}
```

## Endpoints

| Method | Route        | Description                          | Success Code |
|--------|--------------|---------------------------------------|---------------|
| GET    | `/tasks`     | List all tasks (`?status=` optional filter) | 200 |
| GET    | `/tasks/:id` | Get a single task by id               | 200 |
| POST   | `/tasks`     | Create a new task                     | 201 |
| PUT    | `/tasks/:id` | Update an existing task               | 200 |
| DELETE | `/tasks/:id` | Delete a task                         | 204 |

Resources are nouns, methods are verbs — `/tasks`, never `/getTasks`.

## Validation Rules (Gatekeeper Rule: never trust the client)

- `title` — required, string, 1–100 characters.
- `description` — optional, string.
- `status` — optional, must be one of `pending`, `in-progress`, `completed`.
- `:id` params — must be a positive integer.

Invalid requests return `400 Bad Request` with a list of specific errors.

## Status Codes Used

| Code | Meaning | When |
|------|---------|------|
| 200  | OK | Successful GET / PUT |
| 201  | Created | Successful POST |
| 204  | No Content | Successful DELETE |
| 400  | Bad Request | Failed validation |
| 404  | Not Found | Task id doesn't exist, or unknown route |
| 500  | Internal Server Error | Unexpected server failure |

## Example Requests (executable)

**List all tasks**
```bash
curl http://localhost:3000/tasks
```

**Filter by status**
```bash
curl "http://localhost:3000/tasks?status=completed"
```

**Get a single task**
```bash
curl http://localhost:3000/tasks/1
```

**Create a task**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Write tests", "status": "pending"}'
```

**Update a task**
```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Write tests", "status": "completed"}'
```

**Delete a task**
```bash
curl -X DELETE http://localhost:3000/tasks/1
```

**Trigger a validation error (missing title)**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"status": "pending"}'
```

## Project Structure

```
decodelabs-task-api/
├── server.js                  # App entry point
├── routes/taskRoutes.js       # RESTful route definitions
├── controllers/taskController.js  # Request handling / server-side logic
├── middleware/validateTask.js     # Syntactic + semantic validation
├── middleware/errorHandler.js     # 404 + global error handling
├── data/tasks.js              # In-memory data store (no DB yet — that's Project 3)
└── package.json
```

## Notes

- Data is stored in memory and resets on server restart. A real database
  comes in the next project milestone.
- This API is intentionally framework-minimal so the focus stays on backend
  logic: endpoints, validation, and status codes — not visual flair.
