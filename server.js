// Echolink ERP Certification Test - Render-ready Node server
// Results are held in memory (cleared on restart or via the Reset button).

const express = require("express");
const path = require("path");

const app = express();
app.use(express.json({ limit: "256kb" }));
app.use(express.static(path.join(__dirname, "public")));

// In-memory results store
let results = [];
let nextId = 1;

// Student submits a completed test
app.post("/api/submit", (req, res) => {
  const b = req.body || {};
  const name = String(b.name || "").trim().slice(0, 80);
  if (!name) return res.status(400).json({ error: "Name is required" });

  const rec = {
    id: nextId++,
    name,
    email: String(b.email || "").trim().slice(0, 120),
    track: String(b.track || "").slice(0, 60),
    score: Number(b.score) || 0,
    correct: Number(b.correct) || 0,
    total: Number(b.total) || 0,
    passed: !!b.passed,
    timeUsed: Number(b.timeUsed) || 0,
    timedOut: !!b.timedOut,
    when: new Date().toISOString()
  };
  results.push(rec);
  res.json({ ok: true, id: rec.id });
});

// Instructor dashboard polls this (newest first)
app.get("/api/results", (req, res) => {
  const sorted = [...results].sort((a, b) => new Date(b.when) - new Date(a.when));
  res.json({ results: sorted, count: sorted.length });
});

// Instructor clears the board for the next round
app.post("/api/reset", (req, res) => {
  const cleared = results.length;
  results = [];
  nextId = 1;
  res.json({ ok: true, cleared });
});

// Instructor dashboard deep-link (same page, auto-opens admin view)
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("ERP test server running on port " + PORT));
