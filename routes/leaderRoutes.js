// leaderRoutes.js
import express from "express";

const router = express.Router();

// Dummy users array (replace with actual DB or data source)
const users = [
  { name: "Alice", progress: 90 },
  { name: "Bob", progress: 75 },
  { name: "Charlie", progress: 60 },
];

router.get("/leaderboard", (req, res) => {
  const sorted = [...users].sort((a, b) => (b.progress || 0) - (a.progress || 0));

  const leaderboard = sorted.map((u) => ({
    name: u.name,
    progress: u.progress || 0,
  }));

  res.json(leaderboard);
});

export default router;
