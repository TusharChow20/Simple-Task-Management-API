# Task Management API

A simple REST API for managing tasks with user authentication. Built with Node.js, Express, MongoDB, and TypeScript.

---

## Tech Stack

- **Node.js** + **Express.js** — server framework
- **MongoDB** + **Mongoose** — database
- **TypeScript** — type safety
- **JWT** — authentication
- **Zod** — request validation
- **bcryptjs** — password hashing

---

## Live API

```
https://task-management-two-blue.vercel.app/api/v1
```

---

## Getting Started (Run Locally)

**1. Clone the repo**
```bash
git clone https://github.com/TusharChow20/Simple-Task-Management-API
cd Simple-Task-Management-API
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up environment variables**

Create a `.env` file in the root:
```env
PORT=5000
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/task-management
JWT_SECRET=place_your_secret_key_here
JWT_EXPIRES_IN=210d
NODE_ENV=development
```

**4. Start the server**
```bash
npm run dev
```

You should see:
```
MongoDB connected successfully
Server running on port 5000
```

---

## How to Test in Postman

### Step 1 — Register a user

```
POST /api/v1/auth/register
```

Body (raw JSON):
```json
{
  "name": "Your Name",
  "email": "you@example.com",
  "password": "123456"
}
```

You will get back a `token` in the response. **Copy it.**

---

### Step 2 — How to use the Bearer Token

Every task route requires authentication. After login or register, you get a token like this:

```json
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

In Postman, go to the **Authorization** tab of any request:
- Type: **Bearer Token**
- Token: paste your token here

Or add it manually in the **Headers** tab:
```
Key:    Authorization
Value:  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> Without the token, you will get a `401 Unauthorized` error.

---

### Step 3 — Login

```
POST /api/v1/auth/login
```

```json
{
  "email": "you@example.com",
  "password": "123456"
}
```

---

## API Endpoints

### Auth

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/auth/register` | Register new user | No |
| POST | `/api/v1/auth/login` | Login user | No |

### Tasks

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/tasks` | Create a task | Yes |
| GET | `/api/v1/tasks` | Get all your tasks | Yes |
| GET | `/api/v1/tasks/:id` | Get a single task | Yes |
| PATCH | `/api/v1/tasks/:id` | Update a task | Yes |
| DELETE | `/api/v1/tasks/:id` | Delete a task | Yes |

---

## Task Fields

| Field | Type | Values | Required |
|-------|------|--------|----------|
| `title` | string | min 3 chars | Yes |
| `description` | string | max 500 chars | No |
| `status` | string | `todo` / `in-progress` / `done` | No (default: `todo`) |
| `priority` | string | `low` / `medium` / `high` | No (default: `medium`) |
| `dueDate` | ISO date | e.g. `2024-12-31T00:00:00.000Z` | No |

---

## Filtering, Search & Pagination

You can add query parameters to `GET /api/v1/tasks`:

```
# Filter by status
GET /api/v1/tasks?status=todo

# Filter by priority
GET /api/v1/tasks?priority=high

# Search by title
GET /api/v1/tasks?search=meeting

# Pagination
GET /api/v1/tasks?page=1&limit=10

# Combine them
GET /api/v1/tasks?status=todo&priority=high&page=1&limit=5
```

Paginated response includes a `meta` object:
```json
{
  "meta": {
    "total": 25,
    "page": 1,
    "limit": 10,
    "totalPage": 3
  }
}
```

---

## Example: Create a Task

**Request:**
```
POST /api/v1/tasks
Authorization: Bearer <your_token>
Content-Type: application/json
```
```json
{
  "title": "Complete project report",
  "description": "Write the final report for Q4",
  "status": "in-progress",
  "priority": "high",
  "dueDate": "2024-12-31T00:00:00.000Z"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "_id": "65a1b2c3d4e5f6a7b8c9d0e1",
    "title": "Complete project report",
    "description": "Write the final report for Q4",
    "status": "in-progress",
    "priority": "high",
    "dueDate": "2024-12-31T00:00:00.000Z",
    "user": "65a1b2c3d4e5f6a7b8c9d0e0",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

## Error Responses

All errors follow this format:
```json
{
  "success": false,
  "message": "Description of what went wrong"
}
```

| Status Code | Meaning |
|-------------|---------|
| `400` | Validation error |
| `401` | Unauthorized|
| `404` | Resource not found |
| `409` | Conflict (user exits)|
| `500` | Internal server error |

---