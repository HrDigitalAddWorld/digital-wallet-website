const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const walletRoutes = require("./routes/wallet");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/walletWebsite")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/wallet", walletRoutes);

// Server Start
app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
app.get("/", (req, res) => {
  res.send("Wallet Backend Running");
});
