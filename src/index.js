const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*", // atau spesifik domain FE kamu
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(morgan("dev"));

// ✅ Routes
app.use("/api/employees", employeeRoutes);
app.use("/api/auth", require("./routes/authRoutes"));

// ✅ Export app ke server.js
module.exports = app;
