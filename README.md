# TaskFlow Frontend

Frontend demo for a Project Management / Task Todo application.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- lucide-react

## Pages

- `/` — Landing page
- `/login` — Login UI
- `/register` — Register UI
- `/dashboard` — Dashboard
- `/projects` — Projects
- `/tasks` — Tasks / Kanban / List view

## Run

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## API integration

The current UI uses mock data from `lib/mock-data.ts`.

When connecting to your existing TaskFlow Express API, replace the mock data with fetch calls. A clean next step is:

- POST `/auth/register`
- POST `/auth/login`
- POST `/auth/logout`
- GET `/projects`
- POST `/projects`
- GET `/tasks`
- POST `/tasks`
- PATCH `/tasks/:id`
- DELETE `/tasks/:id`

Keep authentication and permission checks in the backend. The frontend should only hide/disable actions for UX; the Express API must enforce the real permissions.
