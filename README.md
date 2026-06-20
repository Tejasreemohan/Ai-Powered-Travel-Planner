# AI Powered Travel Planner

Professional AI-assisted travel planning platform that helps users discover destinations, generate personalized itineraries, and collaborate with friends. This repository contains a React frontend and a Django REST backend suitable for local development and production deployment.

---

## Features

- Secure authentication and role management
- Collect user trip preferences and constraints
- AI-driven destination and itinerary suggestions
- Collaborative trip planning with invites and voting
- Persistent trip history and exportable summaries
- Email notifications for invites and confirmations

---

## Tech Stack

- Frontend: React
- Backend: Django + Django REST Framework
- Database: SQLite (development), PostgreSQL (production)
- Authentication: JWT / session-based as configured in backend
- Extras: python-decouple for environment config, CORS support

---

## Repository Layout

```
Ai-Powered-Travel-Planner/
├─ react/react/reactapp/                # React application (frontend)
├─ travel_django(final)/travel_django/ # Django project (backend)
│  └─ travel/                           # Django project package and apps
└─ README.md                            # Project documentation
```

---

## Getting Started

Prerequisites

- Node.js (LTS) and npm
- Python 3.10+ and `venv`
- Git

Clone the repository

```bash
git clone https://github.com/Tejasreemohan/Ai-Powered-Travel-Planner.git
cd "Ai-Powered-Travel-Planner"
```

### Backend (Django) — local development

```powershell
cd "travel_django(final)/travel_django"
python -m venv .venv
# PowerShell: . .venv\Scripts\Activate
# If activation is restricted, you can invoke the venv Python directly: .venv\Scripts\python.exe
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 8000
```

Create a `.env` file (do NOT commit) under `travel_django(final)/travel_django/travel` with the following variables:

```
SECRET_KEY=your_secret_key
GROQ_API_KEY=your_groq_api_key
GOOGLE_AI_KEY=your_google_api_key
EMAIL_HOST_USER=your_email@example.com
EMAIL_HOST_PASSWORD=your_email_password
ALLOWED_HOSTS=localhost,127.0.0.1
```

### Frontend (React)

```powershell
cd react/react/reactapp
npm install
npm start
```

By default the frontend expects the backend at `http://127.0.0.1:8000`. Set `REACT_APP_API_URL` in the React `.env` files if you run the API elsewhere.

---

## API Overview

- `POST /api/auth/register` — Register user
- `POST /api/auth/login` — Obtain auth token
- `GET /api/trips` — List trips for authenticated user
- `POST /api/trips` — Create a trip
- `POST /api/suggestions` — Request AI-generated suggestions

See the `planner` Django app for full endpoint documentation.

---

## Security & Maintenance

- Do not commit secrets. Use environment variables or a secret manager.
- Rotate any API keys or credentials that were previously committed.
- To purge secrets from git history, use `git filter-repo` or the BFG Repo-Cleaner and force-push the cleaned history.

---

## Roadmap & Enhancements

- Dockerize frontend and backend for consistent development and deployments
- Add automated tests and CI (GitHub Actions)
- Deploy to a cloud provider and add monitoring
- Improve and benchmark AI suggestion models

---

## Contributing

Contributions are welcome. To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit changes and push your branch
4. Open a pull request describing the change

Please include tests for new behavior and keep changes focused.

---

## License

This project is licensed under the MIT License.

---

## Author

**Matta Teja Sree** — https://github.com/Tejasreemohan
