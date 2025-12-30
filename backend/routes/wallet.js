const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

// Get Balance
router.get("/balance", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({ balance: user.balance });
});

// Add Money
router.post("/add-money", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  user.balance += Number(req.body.amount);
  await user.save();
  res.json({ balance: user.balance });
});

// Send Money
router.post("/send-money", auth, async (req, res) => {
  const { email, amount } = req.body;

  const sender = await User.findById(req.user.id);
  const receiver = await User.findOne({ email });

  if (!receiver) return res.status(400).json("Receiver not found");
  if (sender.balance < amount)
    return res.status(400).json("Insufficient balance");

  sender.balance -= amount;
  receiver.balance += amount;

  await sender.save();
  await receiver.save();

  res.json("Money sent successfully");
});

module.exports = router;
