import express from "express";
const router = express.Router();

// In-memory storage for users
const users = [];

// Generate referral code from name
function generateReferral(name) {
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return name.slice(0, 2).toUpperCase() + random;
}

// POST /api/signup
router.post("/signup", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(409).json({ error: "User already exists" });
  }

  const referralCode = generateReferral(name);
  const newUser = {
    name,
    email,
    referralCode,
    progress: 0,
    money: 0,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// POST /api/login
router.post("/login", (req, res) => {
  const { name, email } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: "Name and email required" });
  }

  let user = users.find((u) => u.email === email);

  // If not found, create a new user
  if (!user) {
    const referralCode = generateReferral(name);
    user = {
      name,
      email,
      referralCode,
      progress: 0,
      money: 0,
    };
    users.push(user);
  }

  res.status(200).json(user);
});

// POST /api/dashboard
router.post("/dashboard", (req, res) => {
  const { email } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(404).json({ error: "User not found" });

  const donationAmount = Math.floor(Math.random() * (20000 - 5000 + 1)) + 5000;

  user.money = donationAmount;  // ✅ now we're updating it!

  res.json({
    name: user.name,
    email: user.email,
    referralCode: user.referralCode,
    progress: user.progress,
    money: user.money,         // ✅ now it's random
    donation: donationAmount
  });
});



export default router;
