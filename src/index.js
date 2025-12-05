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
// app.use("/api/auth", require("./routes/authRoutes")); ❗ Nonaktifkan dulu agar tidak bentrok

// ===============================
// ✅ REGISTER & LOGIN SYSTEM
// ===============================

// ✅ Dummy database (sementara di memory)
const users = [];

// ==========================
// ✅ API REGISTER
// ==========================
app.post("/api/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email dan password wajib diisi",
      });
    }

    const userExists = users.find((u) => u.email === email);
    if (userExists) {
      return res.status(400).json({
        message: "Email sudah terdaftar",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: users.length + 1,
      email,
      password: hashedPassword,
      role: "user",
    };

    users.push(newUser);

    res.status(201).json({
      message: "Register berhasil",
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

// ==========================
// ✅ API LOGIN
// ==========================
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(400).json({
        message: "Email tidak ditemukan",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Password salah",
      });
    }

    res.json({
      message: "Login berhasil",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

// ✅ Jalankan server

module.exports = app
