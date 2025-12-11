# Maintenance Request System - Backend API

RESTful API backend for the Maintenance Request System using Node.js, Express, and SQLite.

## Features

- JWT-based authentication
- Role-based access control (Admin/Homeowner)
- Maintenance request management
- Real-time chat messaging
- Push notifications
- SQLite database with migrations

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite3
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator

## Project Structure

```
backend/
├── src/
│   ├── controllers/       # Request handlers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── database/         # Database connection & migrations
│   └── server.js         # Main server file
├── .env                  # Environment variables
├── .env.example          # Environment template
└── package.json          # Dependencies
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

```bash
cp .env.example .env
# Edit .env and set your values
```

3. Run database migrations:

```bash
npm run migrate
```

4. Seed the database (optional):

```bash
npm run seed
```

5. Start the server:

```bash
# Development (default: http://localhost:3000/api)
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/profile` - Update profile (protected)
- `PUT /api/auth/password` - Change password (protected)

### Requests

- `POST /api/requests` - Create request (homeowner)
- `GET /api/requests` - Get all requests (filtered by role)
- `GET /api/requests/:id` - Get request by ID
- `PUT /api/requests/:id` - Update request (admin only)
- `DELETE /api/requests/:id` - Delete request
- `GET /api/requests/stats/summary` - Get stats (admin only)

### Messages

- `POST /api/messages` - Send message
- `GET /api/messages/request/:request_id` - Get messages for request

### Notifications

- `GET /api/notifications` - Get all notifications
- `GET /api/notifications/unread/count` - Get unread count
- `PUT /api/notifications/:id/read` - Mark as read
- `PUT /api/notifications/read-all` - Mark all as read
- `DELETE /api/notifications/:id` - Delete notification

## Default Credentials

After seeding the database:

**Admin:**

- Email: admin@camella.com
- Password: password123

**Homeowner:**

- Email: homeowner@camella.com
- Password: password123

## Environment Variables

| Variable       | Description          | Default                       |
| -------------- | -------------------- | ----------------------------- |
| PORT           | Server port          | 3000                          |
| NODE_ENV       | Environment          | development                   |
| DB_PATH        | SQLite database path | ./src/database/maintenance.db |
| JWT_SECRET     | Secret key for JWT   | (required)                    |
| JWT_EXPIRES_IN | Token expiration     | 7d                            |

## Database Schema (Overview)

### Users (`users`)

- `id`, `email`, `password`, `name`, `role`, `phone`, `address`, `position`, `community`, `profile_image`, `created_at`, `updated_at`

### Maintenance Requests (`maintenance_requests`)

- `id` (string, e.g. `REQ-<timestamp>`),
- `user_id` (FK to `users.id`),
- `type`, `description`, `unit`, `address`,
- `priority` (`High`, `Medium`, `Low`),
- `status` (`pending`, `in-progress`, `completed`),
- `assigned_technician`,
- `technician_notes`, `completion_notes`, `completed_date`,
- `created_at`, `updated_at`

### Messages (`messages`)

- `id`, `request_id` (FK to `maintenance_requests.id`), `sender` (`admin` or `homeowner`), `message`, `created_at`

### Notifications (`notifications`)

- `id`, `user_id` (FK to `users.id`), `type`, `title`, `message`, `is_read`, `created_at`

## Development

```bash
# Install dependencies
npm install

# Run in development mode (auto-reload)
npm run dev

# Run migrations
npm run migrate

# Seed database
npm run seed
```

## License

MIT
