# SLO Alumni Reunion Admin Panel

Authenticated admin interface for managing registrations submitted through the public SLO Alumni Reunion website. This project is used by organizers to review attendee data, search records and remove entries when needed.

It is part of a two-repository setup:

- public registration website: <https://mikel538.github.io/Zaproszenie-Zjazd-SLO/>
- admin panel: <https://mikel538.github.io/Zaproszenie-Zjazd-SLO-Admin/>

## Live Demo

Admin panel:

<https://mikel538.github.io/Zaproszenie-Zjazd-SLO-Admin/>

Demo credentials:

- Email: `test`
- Password: `test`

The demo login exists for portfolio review only and uses mock in-memory data instead of real submissions.

## Project Purpose

- Give authorized school staff access to reunion registrations
- Keep the public registration flow separate from administrative operations
- Protect real participant data with Supabase authentication and database policies
- Provide a safe portfolio demo without exposing personal data

## Features

- Email and password login with Supabase Auth
- Demo mode with hardcoded example records
- Fetching attendee records from Supabase
- Search across visible table content
- Sorting by surname
- Sorting by graduation year
- Deleting records from the admin table
- Public deployment through GitHub Pages

## Security Approach

This repository is public, but real data access is not based on hiding frontend code.

Security is handled through Supabase:

- authenticated users sign in with email and password
- real admin accounts are controlled separately from the public form
- database access is restricted with Row Level Security (RLS)
- demo credentials do not expose production data

In practice, the app can be inspected publicly, but unauthorized users still cannot read or modify protected records if database rules are configured correctly.

## Data Flow

1. Alumni submit the public registration form in the separate frontend repository.
2. Records are stored in the `guest_data` table in Supabase.
3. Authorized users sign in to this admin panel.
4. The panel fetches rows, renders them in a table and allows filtering, sorting and deletion.

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (ES Modules)
- Supabase Auth
- Supabase PostgreSQL
- Supabase Row Level Security (RLS)
- GitHub Pages

## Local Run

No build step is required.

1. Clone the repository:

```bash
git clone https://github.com/MikeL538/Zaproszenie-Zjazd-SLO-Admin.git
```

2. Open `index.html` in a browser or serve it locally.

## Repository Structure

```text
.
|- index.html
|- script.js
|- style.css
`- readme.md
```

## Notes

- This is a real utility project for a school event, not only a mock dashboard.
- The demo mode is intentionally limited to fictional sample data.
- Real registrations come from the public reunion website stored in a Supabase.
- The current UI is functional and minimal, focused on administration rather than presentation.
