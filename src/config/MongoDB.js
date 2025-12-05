const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL belum didefinisikan di .env");
    }

    await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 10000, // ⏱️ Max 10 detik
    });

    console.log("✅ Koneksi MongoDB berhasil!!");
  } catch (err) {
    console.log("❌ Koneksi MongoDB gagal!!");
    console.error("Pesan Error:", err.message);

    process.exit(1);
  }
};

module.exports = connectDB;
