require("dotenv").config();

const express = require("express");
const cors = require("cors");

const jobReg = require("./routes/jobReg_routes");

const app = express();
const PORT = process.env.PORT || 7007;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/status", jobReg);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Testing api working",
    endpoints: {
      "POST /status/jobReg": "Insert or Update integration status",
    },
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}/`);
  console.log(
    "✅ Server started - database connections will be created on demand"
  );
});
