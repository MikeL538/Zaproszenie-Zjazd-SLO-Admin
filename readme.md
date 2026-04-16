# SLO Alumni Reunion Admin Panel

Authenticated admin interface for managing registrations submitted through the public SLO Alumni Reunion website. This repository is the protected side of a small fullstack workflow built for a real school event.

It is part of a two-repository setup:

- public registration website:  https://zjazd-slo.mikeldev.online/
- admin panel: https://zjazd-slo-admin.mikeldev.online/

## Live Demo

Admin panel demo credentials:
- Email: `test`
- Password: `test`

The demo login exists for portfolio review only and uses mock in-memory data instead of real submissions.

## Portfolio Context

This repository shows the administrative side of the project and highlights practical backend-oriented concerns in a frontend-first stack:

- authentication and session handling
- protected access to stored records
- safe rendering of user-submitted content
- separation between demo data and production data
- simple but useful CRUD-style administration workflow

## What This Project Does

- lets authorized organizers sign in and review registrations
- fetches attendee data from Supabase
- supports searching and sorting records in the browser
- allows deleting entries
- allows updating payment status through `is_paid`
- keeps the interface intentionally simple and readable for admin work

## Key Features

- Email and password login with Supabase Auth
- Demo mode with fictional sample records for portfolio review
- Session-aware UI with sign-in, sign-out and initial session restore
- Fetching attendee records from Supabase
- Search across visible table content
- Sorting by surname and graduation year
- Deleting entries from the admin table
- Updating payment status with a checkbox bound to Supabase
- Safe DOM rendering of user-provided data
- Public deployment through GitHub Pages

## Security Approach

This repository is public, but access to real data is not based on hiding frontend code.

Security is handled through Supabase:

- authenticated users sign in with email and password
- admin accounts are managed separately from the public form
- database permissions and Row Level Security protect the `guest_data` table
- the frontend uses a public key, while actual permissions are enforced in the backend layer
- demo credentials do not expose production data

In practice, the code can be inspected publicly, but unauthorized users still cannot read or modify protected records when Supabase permissions are configured correctly.

## Data Flow

1. Alumni submit the public registration form in the separate frontend repository.
2. Records are stored in the `guest_data` table in Supabase.
3. Authorized users sign in to this admin panel.
4. The panel fetches records and renders them safely in the browser.
5. Admins can search, sort, delete records and update payment status.

## Engineering Notes

- User-submitted values are rendered safely instead of being injected as raw HTML.
- Session state is synchronized with the UI through Supabase auth events.
- The admin panel is deliberately minimal because clarity matters more than visual polish in this use case.
- The project demonstrates practical tradeoffs: simple frontend architecture, but real backend permissions and data protection.

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

## Why It Matters

- This is a real utility project, not only a mock dashboard.
- It shows that I can think beyond UI and handle auth, permissions and data safety.
- It complements the public frontend repository and turns the overall solution into a complete small-scale fullstack project.
