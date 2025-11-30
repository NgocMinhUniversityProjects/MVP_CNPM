# Backend API

REST API for HCMUT Tutor Platform with JWT authentication.

## Setup

```bash
cd backend
npm install
npm start
```

Server runs on `http://localhost:5000`

## API Endpoints

**Authentication** (all under `/api/auth`)
- `POST /signup` - Register user (email, password, name, role, studentId, phoneNumber)
- `POST /login` - Login (email, password) → returns token
- `GET /me` - Get current user (requires auth)
- `POST /verify` - Verify token (requires auth)
- `POST /logout` - Logout (requires auth)

Protected endpoints require: `Authorization: Bearer <token>`

## Test Accounts

| Email | Password | Role |
|-------|----------|------|
| student@hcmut.edu.vn | student123 | student |
| tutor@hcmut.edu.vn | tutor123 | tutor |
| admin@hcmut.edu.vn | admin123 | admin |

## Notes

- Data stored in-memory (resets on server restart)
- JWT secret hardcoded (use env variables in production)
- Replace with real database for production use
