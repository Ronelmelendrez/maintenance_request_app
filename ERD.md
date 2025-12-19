## Database Schema - Maintenance Request System

### Entity Relationship Diagram

```
                    ┌─────────────────────────────────────┐
                    │         USERS                       │
                    ├─────────────────────────────────────┤
                    │ PK id (INTEGER)                     │
                    │ email (TEXT) UNIQUE                 │
                    │ password (TEXT)                     │
                    │ name (TEXT)                         │
                    │ role (TEXT)                         │
                    │ phone (TEXT)                        │
                    │ address (TEXT)                      │
                    │ position (TEXT)                     │
                    │ community (TEXT)                    │
                    │ profile_image (TEXT)                │
                    │ created_at (DATETIME)               │
                    │ updated_at (DATETIME)               │
                    └─────────────────────────────────────┘
                              ▲       ▲       ▲
                              │       │       │
                        1     │       │       │     1
                              │       │       │
                    ┌─────────┘       │       └─────────┐
                    │                 │                 │
                    │            1    │    1            │
                    │                 │                 │
                    N                 N                 N
                    │                 │                 │
                    ▼                 ▼                 ▼
    ┌────────────────────────────────────┐   ┌──────────────────────────────────┐
    │  MAINTENANCE_REQUESTS              │   │  NOTIFICATIONS                   │
    ├────────────────────────────────────┤   ├──────────────────────────────────┤
    │ PK id (TEXT)                       │   │ PK id (INTEGER)                  │
    │ FK user_id (INTEGER)               │   │ FK user_id (INTEGER)             │
    │ type (TEXT)                        │   │ type (TEXT)                      │
    │ description (TEXT)                 │   │ title (TEXT)                     │
    │ unit (TEXT)                        │   │ message (TEXT)                   │
    │ address (TEXT)                     │   │ is_read (BOOLEAN)                │
    │ priority (TEXT)                    │   │ created_at (DATETIME)            │
    │ status (TEXT)                      │   └──────────────────────────────────┘
    │ assigned_technician (TEXT)         │
    │ technician_notes (TEXT)            │
    │ completion_notes (TEXT)            │
    │ completed_date (DATE)              │
    │ created_at (DATETIME)              │
    │ updated_at (DATETIME)              │
    └────────────────────────────────────┘
                    │
                    │ 1
                    │
                    N
                    │
                    ▼
            ┌──────────────────────────────────┐
            │  MESSAGES                        │
            ├──────────────────────────────────┤
            │ PK id (INTEGER)                  │
            │ FK request_id (TEXT)             │
            │ FK sender_id (INTEGER)           │
            │ sender (TEXT)                    │
            │ message (TEXT)                   │
            │ created_at (DATETIME)            │
            └──────────────────────────────────┘


### Table Specifications

#### USERS

- **Primary Key**: `id` (INTEGER, AUTO_INCREMENT)
- **Unique Constraint**: `email`
- **Check Constraint**: `role IN ('admin', 'homeowner')`
- **Relationships**: 1-to-N with MAINTENANCE_REQUESTS, NOTIFICATIONS, MESSAGES (sender_id)

#### MAINTENANCE_REQUESTS

- **Primary Key**: `id` (TEXT)
- **Foreign Keys**: `user_id` → USERS(id)
- **Check Constraints**:
  - `priority IN ('High', 'Medium', 'Low')`
  - `status IN ('pending', 'in-progress', 'completed')`
- **Relationships**: N-to-1 with USERS, 1-to-N with MESSAGES

#### MESSAGES

- **Primary Key**: `id` (INTEGER, AUTO_INCREMENT)
- **Foreign Keys**:
  - `request_id` → MAINTENANCE_REQUESTS(id)
  - `sender_id` → USERS(id)
- **Check Constraint**: `sender IN ('admin', 'homeowner')`

#### NOTIFICATIONS

- **Primary Key**: `id` (INTEGER, AUTO_INCREMENT)
- **Foreign Keys**: `user_id` → USERS(id)
- **Relationships**: N-to-1 with USERS

### Normalization Notes

- Database is in **3NF** (Third Normal Form)
- All tables have proper primary keys
- Foreign key relationships are properly defined
- Check constraints enforce data integrity
- Timestamps (created_at, updated_at) track record changes
- Denormalization present only where necessary (sender and sender_id in MESSAGES for convenience)
```
