require("dotenv").config();
const connectDB = require("./config/MongoDB");
const app = require("./index");

// ✅ Connect ke MongoDB dulu
connectDB();

// ✅ Route test
app.get("/", (req, res) => {
  res.send("✅ Server berjalan & MongoDB terhubung!");
});

// ✅ Jalankan server
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server berjalan di port ${PORT}`);
  console.log(`✅ Access http://localhost:${PORT}`);
});
