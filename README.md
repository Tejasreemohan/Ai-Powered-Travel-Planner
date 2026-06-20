# AI Powered Travel Planner

This repository contains a React frontend and a Django backend for an AI-powered travel planner.

## Structure
- `react/react/reactapp` — React frontend
- `travel_django(final)/travel_django` — Django backend

## Prerequisites
- Node.js + npm
- Python 3.10+ and `venv`

## Backend (Django) — quick start
1. Create a virtual environment and activate it:
```powershell
cd "travel_django(final)/travel_django"
python -m venv .venv
.venv\Scripts\Activate
```
2. Install dependencies and run migrations:
```powershell
pip install -r requirements.txt
python manage.py migrate
```
3. Create a `.env` file in `travel_django(final)/travel_django/travel` with the following variables (do NOT commit it):
```
SECRET_KEY=your_secret_here
GROQ_API_KEY=your_groq_key
GOOGLE_AI_KEY=your_google_api_key
EMAIL_HOST_USER=you@example.com
EMAIL_HOST_PASSWORD=your_email_password
ALLOWED_HOSTS=localhost,127.0.0.1
```
4. Run the server:
```powershell
python manage.py runserver
```

## Frontend (React) — quick start
```powershell
cd react/react/reactapp
npm install
npm start
```

## Git & Deployment notes
- A root `.gitignore` was added to ignore `.env`, venvs, `node_modules`, and OS files.
- The frontend was embedded into the root repository (no submodule) so the repo contains both projects.
- Secrets previously present in commits should be rotated now — revoke/regenerate any exposed API keys and passwords.

To remove secrets from git history, consider using the BFG Repo-Cleaner or `git filter-repo`, then force-push the cleaned history and inform collaborators.

## Contact / Next steps
- If you want, I can:
  - Start both servers here to verify functionality, or
  - Remove secrets from git history now (history rewrite), or
  - Create CI/CD or deployment files.
