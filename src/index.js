const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bcrypt = require("bcryptjs"); // ✅ WAJIB

const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(morgan("dev"));

// ✅ Routes utama
app.use("/api/employees", employeeRoutes);
const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes);


module.exports = app
