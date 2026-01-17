# Alumni Reunion – Admin Panel

Authenticated admin panel for viewing the list of registered alumni for the SLO reunion event.

This application is intended **only for authorized staff (e.g. school administration)** and provides read-only access to registration data stored in Supabase.

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
  Security is handled correctly via Supabase RLS, not by hiding code.
- The public registration form is implemented in a **separate repository**
- For demo purposes, this panel can be connected to a mock dataset

---

## Disclaimer

This admin panel is not intended for public use.  
Access is restricted to explicitly authorized users only.
