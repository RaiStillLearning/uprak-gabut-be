const mongoose = require("mongoose");

const requestAccountSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    reason: String,
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RequestAccount", requestAccountSchema);
