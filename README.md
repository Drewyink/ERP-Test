# Echolink ERP Certification Test

A live, in-class ERP knowledge test with an instructor dashboard. 100 questions covering
ERP Business Analyst, ERP Help Desk, and ERP Support Specialist. Pass mark is 85%.

## What it does

- Students open the link, sign in with their name, and take the timed test (90 minutes).
- Correct answers are spread across A/B/C/D (not always the same letter).
- When a student submits, their score posts to the server.
- The instructor opens the dashboard and watches scores roll in live (auto-refresh every 3s).
- Reset clears the board so you can run the next round.

Results are held in memory. They clear when you press Reset or when the server restarts.
Export CSV before resetting if you want a record.

## Deploy on Render

1. Push these files to a GitHub repo (or upload directly).
2. In Render, create a new **Web Service** from the repo.
3. Settings:
   - Environment: **Node**
   - Build command: `npm install`
   - Start command: `npm start`
4. Deploy. Render gives you a public URL like `https://your-app.onrender.com`.

No environment variables needed.

## Links to share

- Student test:        `https://your-app.onrender.com/`
- Instructor dashboard: `https://your-app.onrender.com/dashboard`

You can also reach the dashboard from any screen using the "Instructor view"
button in the bottom-right corner.

## Run locally

```
npm install
npm start
```

Then open http://localhost:3000

## Note on Render free tier

Free Render services sleep after inactivity and restart, which clears in-memory results.
For a class session keep the service awake (hit the URL shortly before class), and export
CSV before the service idles if you need to keep records.
