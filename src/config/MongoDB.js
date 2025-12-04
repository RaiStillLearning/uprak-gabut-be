const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL belum didefinisikan di file .env");
    }

    await mongoose.connect(process.env.MONGO_URL);

    console.log("✅ Koneksi MongoDB berhasil!!");
  } catch (err) {
    console.log("❌ Koneksi MongoDB gagal!!");
    console.error("Pesan Error:", err.message);

    // ✅ Paksa server berhenti jika DB gagal connect
    process.exit(1);
  }
};

module.exports = connectDB;
