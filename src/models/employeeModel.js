const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    nik: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    nama: {
      type: String,
      required: true,
      trim: true,
    },
    jabatan: {
      type: String,
      required: true,
      trim: true,
    },
    gaji: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: String,
      default: "system",
    },
    updatedBy: {
      type: String,
      default: "system",
    },
  },
  {
    timestamps: true, // createdAt & updatedAt otomatis
  }
);

module.exports = mongoose.model("Employee", employeeSchema);
