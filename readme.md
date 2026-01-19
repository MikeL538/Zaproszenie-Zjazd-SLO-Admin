# Alumni Reunion – Admin Panel

Authenticated administrative panel for viewing and managing the list of registered alumni for the SLO reunion event.

This application is intended **only for authorized staff (e.g. school administration)** and provides controlled access to registration data stored in Supabase.

---

## Live Demo (Portfolio)

The admin panel is available via **GitHub Pages**:

👉 **https://mikel538.github.io/Zaproszenie-Zjazd-SLO-Admin/**

This demo exists **for portfolio and presentation purposes only**.

---

## Demo Access (Safe Preview Mode)

To allow reviewers to explore the functionality without exposing real personal data, the application includes a **demo login mode**.

**Demo credentials:**

- **Email:** `test`
- **Password:** `test`

When logged in using demo credentials:

- the application displays **mock (hardcoded) data**
- database records are **not modified**
- delete operations affect demo rows only

> Real guest data is accessible **only** to invite-only Supabase accounts protected by authentication and Row Level Security (RLS).

---

## Purpose

- Provide authorized users with access to alumni registration data
- Ensure personal data is protected at the database level
- Clearly separate public registration from private administrative access
- Demonstrate correct frontend–backend security architecture

---

## Features

- Email + password authentication (Supabase Auth)
- Invite-only user accounts (public registration disabled)
- Secure data access enforced via Supabase Row Level Security (RLS)
- Alphabetical sorting by surname
- Sorting by graduation year
- Client-side search and table filtering
- Record deletion for authenticated admin users
- Demo-safe mode for portfolio presentation

---

## Data Handling Strategy

- **Database layer:** all text data stored in lowercase (normalization)
- **Admin UI:** data rendered in uppercase for improved readability
- **Demo mode:** uses mock data only (no real database access)

This approach keeps data consistent while improving UX for non-technical users.

---

## Security Model

This application relies on **database-level security**, not frontend obfuscation.

### Authentication

- Supabase Auth (email + password)
- Account creation disabled (invite-only)
- No anonymous access to protected data

### Authorization (RLS)

- `SELECT` and `DELETE` restricted to `authenticated` users
- `anon` users have **no permissions**
- Policies enforced directly in PostgreSQL via RLS

Even with a public repository, unauthorized users cannot access sensitive data.

---

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript (ES Modules)
- Supabase
  - Auth
  - PostgreSQL
  - Row Level Security (RLS)

---

## Project Structure

/
├── index.html
├── style.css
├── script.js
└── README.md

---

## Notes for Recruiters

- This repository is intentionally **public**
- Security is handled correctly via Supabase Auth and RLS
- The public alumni registration form lives in a **separate repository**
- Demo mode exists solely to present functionality safely

---

## Disclaimer

This admin panel is not intended for public use.  
Access to real data is restricted to explicitly authorized users only.
