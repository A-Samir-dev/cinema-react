# 🎬 Cinema – React Frontend

A React single-page app for browsing movies, with user authentication and a personal watchlist. It consumes a Laravel REST API.

## Live Demo
- **Frontend:** https://cinema-react-blush.vercel.app
- **API:** https://cinema-api-f46fe.containers.snapdeploy.app/api/movies
- **Backend repo (Laravel):** https://github.com/A-Samir-dev/cinema-api

> **Note:** the backend is on a free tier and sleeps after 15 minutes of inactivity. If the movie list does not load, open the API link above, wait about a minute, then refresh the app.

You can create your own account from the Register page (no email verification).

## Features
- Browse movies with search
- Movie details with similar movies
- Register / Login / Logout (Laravel Sanctum token auth)
- Personal watchlist (add / remove) for logged-in users
- Protected routes and client-side routing

## Tech Stack
- **Frontend:** React 19 (Vite), React Router, Axios
- **Backend:** Laravel 12 (PHP 8.2), Sanctum, Form Requests, API Resources
- **Database:** MySQL-compatible (TiDB Cloud)
- **Hosting:** Vercel (frontend), SnapDeploy with Docker (backend)

## Run Locally
```bash
git clone https://github.com/A-Samir-dev/cinema-react.git
cd cinema-react
npm install
echo "VITE_API_URL=http://127.0.0.1:8000" > .env
npm run dev
```
Then open http://localhost:5173. The backend must be running (see the backend repo).