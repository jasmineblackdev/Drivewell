# DriveWell — Monorepo

CDL driver health & DOT compliance platform.

## Projects

| Folder | Description | Stack |
|--------|-------------|-------|
| `app/` | Mobile app for CDL drivers | React + Vite + Capacitor |
| `fleet/` | Fleet manager dashboard | React + Vite |
| `api/` | Backend REST API | Node.js + Express + PostgreSQL |
| `website/` | Marketing website | React + Vite |

## Getting Started

Each sub-project runs independently:

```bash
# Mobile app
cd app && npm install && npm run dev

# Fleet dashboard
cd fleet && npm install && npm run dev

# API server
cd api && npm install && cp .env.example .env && npm run dev

# Marketing website
cd website && npm install && npm run dev
```

## Ports (development)

| App | Default Port |
|-----|-------------|
| Mobile app | 5173 |
| Fleet dashboard | 5174 |
| Marketing website | 5175 |
| API | 4000 |
