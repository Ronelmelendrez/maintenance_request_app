# Maintenance Request System

Fullstack maintenance request application for residential communities, built with an Expo React Native frontend and a Node.js/Express + SQLite backend.

The system supports homeowners submitting maintenance requests, admins managing and tracking those requests, in-app chat, notifications, and an analytics dashboard.

---

## Architecture Overview (Fullstack)

- **Frontend (mobile/web)**
  - Expo / React Native app in the project root (`app/`, `src/`)
  - Screens for **Homeowner** and **Admin** roles
  - Uses a typed service layer in `src/services` to communicate with the backend
- **Backend API**
  - Node.js + Express server in `backend/`
  - SQLite database with migrations and seed scripts
  - JWT authentication with role-based access control (admin, homeowner)
- **Database**
  - SQLite database file at `backend/src/database/maintenance.db` (by default)
  - Core tables: `users`, `maintenance_requests`, `messages`, `notifications`

For a more detailed walkthrough of the stack and features, see `GETTING_STARTED.md`.

---

## Quick Start

### 1. Prerequisites

- Node.js v16 or later
- npm or yarn
- Git
- Expo Go app on a device **or** an emulator/simulator

### 2. Clone the Repository

```bash
git clone https://github.com/Ronelmelendrez/maintenance_request_app.git
cd maintenance_request_app
```

### 3. Install Frontend Dependencies

From the project root:

```bash
npm install
```

### 4. Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

### 5. Initialize the Database (Backend)

Run migrations and seed data (from `backend/`):

```bash
cd backend
npm run migrate
npm run seed
cd ..
```

This will create the database file and insert sample admin/homeowner accounts and sample requests.

### 6. Run the Backend API

From `backend/`:

```bash
cd backend
npm run dev
```

The API will run at:

```text
http://localhost:3000/api
```

You can configure the port and database path via `backend/.env` (see **Backend Documentation** below).

### 7. Run the Frontend (Expo)

From the project root:

```bash
npx expo start
```

Then:

- Press `a` to open Android emulator, `i` for iOS simulator, or `w` for web
- Or scan the QR code with the Expo Go app on your device

Make sure the frontend is pointing to the correct backend URL (see `src/services/api.ts`).

---

## Frontend Documentation

The frontend lives in the project root and `src/` directory.

Key locations:

- `app/` – Expo Router entry (navigation shell)
- `src/screens/`
  - `admin/` – Admin dashboard, maintenance requests pages, notifications, profile
  - `homeowner/` – Homeowner dashboard, submit request, request detail, chat, notifications, profile
- `src/components/` – Shared and role-specific components
  - `admin/` – Admin cards, stats grid, modals
  - `homeowner/` – Request cards, category grid, modals
  - `auth/` – Login and signup forms
  - `common/` – Buttons, inputs, bottom navigation
- `src/services/` – API integration layer
  - `api.ts` – Base HTTP client (`API_BASE_URL` for backend)
  - `authService.ts` – Login, register, profile
  - `requestService.ts` – CRUD operations and stats for maintenance requests
  - `messageService.ts` – Chat messaging per request
  - `notificationService.ts` – Notifications and unread count
- `src/config/`
  - `environment.ts` – Environment-specific config
  - `theme.ts` – Colors, typography, spacing
- `src/types/` – Shared TypeScript interfaces

For a step‑by‑step guide to running and using the app from the frontend perspective (screens, roles, and flows), see `GETTING_STARTED.md`.

---

## Backend Documentation

The backend is in the `backend/` directory and exposes a REST API used by the frontend.

Key files and directories:

- `backend/src/server.js` – Express app and route wiring
- `backend/src/controllers/` – Controllers for auth, requests, messages, notifications
- `backend/src/models/` – Data access for `users`, `maintenance_requests`, `messages`, `notifications`
- `backend/src/routes/` – Route definitions under `/api/*`
- `backend/src/middleware/` – Auth, validation, error handling
- `backend/src/database/` – Connection, migrations (`migrate.js`), and seeding (`seed.js`)

Detailed backend documentation:

- `backend/README.md` – Backend setup, environment variables, and endpoint overview
- `backend/API_DOCUMENTATION.md` – HTTP API reference (paths, payloads, and responses)

Default API base URL (after `npm run dev` in `backend/`):

```text
http://localhost:3000/api
```

---

## Fullstack / End‑to‑End Flow

High‑level lifecycle of a maintenance request:

1. **Homeowner submits a request** from the app (type, description, unit, address, priority).
2. **Backend** creates a `maintenance_requests` row and a notification for admins.
3. **Admin dashboard** (web/mobile) lists all requests, grouped by status and priority.
4. **Admin assigns a technician** and moves status from `pending` → `in-progress`.
5. **Chat** is available while a request is in progress; messages are stored in `messages` and trigger notifications.
6. **Admin completes the request**, adds notes, and sets status to `completed`.
7. **Analytics / Stats** on the admin dashboard (weekly chart, counts, response time) are derived from the backend database state.

The frontend syncs with the backend using periodic polling and request‑detail refresh to ensure both homeowner and admin views always reflect the current database state.

---

## Default Accounts

After running the seed script (`npm run seed` in `backend/`), the following accounts are available:

- **Admin**
  - Email: `admin@camella.com`
  - Password: `password123`
- **Homeowner**
  - Email: `homeowner@camella.com`
  - Password: `password123`

These credentials are intended for development and testing only.

---

## Additional Documentation

- `GETTING_STARTED.md` – Canonical, detailed setup & usage guide (frontend + backend)
- `backend/README.md` – Backend‑only documentation (architecture, env, endpoints)
- `backend/API_DOCUMENTATION.md` – HTTP API reference
- `SETUP_AND_RUN.md` – Older/legacy setup guide (kept for reference)
- `ERD.md` – Entity‑relationship diagram for the current database schema

---

## Tech Stack

- **Frontend**: React Native, Expo, TypeScript
- **Backend**: Node.js, Express
- **Database**: SQLite (file‑based)
- **Auth**: JWT, bcryptjs
- **Other**: react-native-svg (charts), react-native-progress, AsyncStorage

---

## License

MIT
