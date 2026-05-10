# Team-58 (cfg-diksha-final)

A full-stack web application with an **Express (Node.js)** backend and a **Vite** frontend.  
Backend supports **MongoDB**, **JWT authentication**, **Google OAuth**, and **Razorpay** payments (based on environment configuration).

---

## Features

- Express REST API
- MongoDB integration (Atlas/local)
- Auth:
  - JWT-based login/session
  - Google OAuth
- Razorpay payment integration
- Vite frontend (dev server + production build)

---

## Project Structure

- `Team-58/backend/` — Express backend (API)
- `Team-58/frontend/` — Vite frontend (UI)

---

## Tech Stack

- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Auth:** JWT, Google OAuth
- **Payments:** Razorpay
- **Frontend:** Vite, Tailwind (if configured)

---

## Setup & Run (Mac)

### 1) Install dependencies

Backend:
```bash
cd Team-58/backend
npm install
```

Frontend:
```bash
cd ../frontend
npm install
```

---

## Environment Variables (Important)

### Backend `.env`
Create: `Team-58/backend/.env`

Do **not** commit this file. Use safe placeholders:

```properties
PORT=3000

MONGO_URI=your_mongodb_connection_string

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

JWT_SECRET=your_long_random_jwt_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

BACKEND_URL=http://localhost:3000
CLIENT_URL=http://localhost:5174
```

### Frontend `.env` (if required by the frontend code)
Create: `Team-58/frontend/.env`

```properties
VITE_BACKEND_URL=http://localhost:3000
```

---

## Run the Project

### Start the backend
cd Team-58/backend
npm run dev

If `dev` is not available:
```bash
npm start
```

Backend URL:
- `http://localhost:3000` (or the `PORT` you set)

### Start the frontend
cd Team-58/frontend
npm run dev

Frontend URL:
- Vite will print the local URL in the terminal (commonly `http://localhost:5174`)

---

## How It Works (High Level)

1. The frontend calls backend endpoints using `VITE_BACKEND_URL`.
2. The backend connects to MongoDB using `MONGO_URI`.
3. Authentication uses:
   - JWT (`JWT_SECRET`)
   - Google OAuth (`GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`)
4. Payment flows (if enabled) use Razorpay keys.

---

## Troubleshooting

### Error: `EADDRINUSE: address already in use :::3000`
Port 3000 is already in use.

Find and kill the process:
lsof -ti:3000
kill -9 $(lsof -ti:3000)

Or run backend on another port:
PORT=3001 npm run dev

### MongoDB connection issues
- Verify `MONGO_URI`
- If using MongoDB Atlas:
  - Ensure your IP is allowlisted
  - Ensure DB user/password is correct

---

## Security Notes

- Never commit `.env` files.
- If credentials were exposed, rotate:
  - MongoDB credentials/URI
  - Razorpay secret key
  - Google OAuth client secret
  - JWT secret

---
