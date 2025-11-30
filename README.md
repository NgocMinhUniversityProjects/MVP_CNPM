# HCMUT Tutor Platform

Web platform connecting students and tutors at HCMUT. Created for Software Engineering course (October 2025).

## Live Demo

[https://ngocminhuniversityprojects.github.io/MVP_CNPM/build/](https://ngocminhuniversityprojects.github.io/MVP_CNPM/build/)

## Features

- Login/Signup with JWT authentication
- Dashboard and account management
- Schedule management and session booking
- Messaging, forum, and feedback
- Document library

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Backend**: Node.js + Express
- **Auth**: JWT + bcrypt

## Setup

1. **Install dependencies:**
```bash
npm install
cd backend && npm install && cd ..
```

2. **Run the application:**
```bash
# Terminal 1: Backend
cd backend && npm start

# Terminal 2: Frontend
npm start
```

Backend: `http://localhost:5000` | Frontend: `http://localhost:3000`

## Test Accounts

| Email | Password | Role |
|-------|----------|------|
| student@hcmut.edu.vn | student123 | Student |
| tutor@hcmut.edu.vn | tutor123 | Tutor |
| admin@hcmut.edu.vn | admin123 | Admin |

## Notes

- Data is hardcoded and stored in-memory (resets on restart)
- API documentation in `backend/README.md`
- Created for HCMUT Software Engineering Course, October 2025


