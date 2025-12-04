const mongoose = require('mongoose');


const connectDB = async () => {
    try {

        await mongoose.connect(process.env.MONGO_URL)
        console.log("Koneksi MongoDB berhasil!!")
    } catch (err) {
        console.log("Koneksi MongoDB gagal!!")
        console.error(err)
    }
}


module.exports = connectDB;