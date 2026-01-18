# Alumni Reunion – Admin Panel

Authenticated admin panel for viewing the list of registered alumni for the SLO reunion event.

This application is intended **only for authorized staff (e.g. school administration)** and provides read-only access to registration data stored in Supabase.

---

## Live Demo

The admin panel is available via **GitHub Pages**:

👉 **https://mikel538.github.io/Zaproszenie-Zjazd-SLO-Admin/**

The demo is provided for **portfolio and presentation purposes**.

---

## Demo Access (Portfolio Mode)

To allow reviewers to preview the functionality without exposing real personal data, the application includes a **demo login mode**.

**Demo credentials:**

- **Email:** `test`
- **Password:** `test`

When using demo credentials, the application displays **mock data** instead of real database records.

> Real guest data remains protected and is accessible only to authorized, invite-only accounts via Supabase Auth and Row Level Security (RLS).

---

## Purpose

- Allow authorized users to view the list of registered alumni
- Protect personal data via authentication and database-level security
- Separate public registration flow from private administrative access

---

## Features

- Email + password authentication (Supabase Auth)
- Invite-only accounts (public registration disabled)
- Secure data access enforced by Supabase Row Level Security (RLS)
- Alphabetically sorted list of registered guests
- Client-side table search and filtering
- No public access to registration data

---

## Security Model

This application relies on **database-level security**, not frontend obfuscation.

### Authentication

- Users must authenticate using Supabase Auth
- Account creation is disabled (invite-only)
- Only authenticated users can access guest data

### Authorization (RLS)

- `SELECT` access restricted to `authenticated` users
- Public (`anon`) users have **no read permissions**
- RLS policies enforced directly in the database

This ensures that even if the frontend code is public, unauthorized users cannot access any sensitive data.

---

## Tech Stack

- HTML / CSS
- Vanilla JavaScript (ES Modules)
- Supabase
  - Auth (email + password)
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

- This project intentionally uses a **public repository**
- Security is handled correctly via Supabase Auth and RLS, not by hiding source code
- The public alumni registration form is implemented in a **separate repository**
- Demo mode exists solely to present functionality without exposing real data

---

## Disclaimer

This admin panel is not intended for public use.  
Access to real data is restricted to explicitly authorized users only.
