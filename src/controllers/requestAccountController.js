const RequestAccount = require("../models/RequestAccount");
const transporter = require("../config/mailer");

exports.requestAccount = async (req, res) => {
  try {
    const { name, email, phone, reason } = req.body;

    if (!name || !email || !reason) {
      return res.status(400).json({ message: "Data wajib tidak lengkap" });
    }

    // ✅ Simpan ke MongoDB
    const request = await RequestAccount.create({
      name,
      email,
      phone,
      reason,
    });

    // ✅ Email ke USER
    await transporter.sendMail({
      from: `"Admin" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Permintaan Akun Berhasil Dikirim",
      html: `
        <h3>Halo ${name},</h3>
        <p>Permintaan akun Anda telah kami terima.</p>
        <p>Tunggu persetujuan dari admin.</p>
        <br/>
        <b>Terima kasih.</b>
      `,
    });

    // ✅ Email ke ADMIN
    await transporter.sendMail({
      from: `"System" <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "Permintaan Akun Baru",
      html: `
        <h3>Permintaan Akun Baru</h3>
        <p><b>Nama:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Telepon:</b> ${phone}</p>
        <p><b>Alasan:</b> ${reason}</p>
      `,
    });

    res.status(201).json({
      message: "Permintaan berhasil dikirim",
      data: request,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
