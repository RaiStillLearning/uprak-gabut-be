require ("dotenv").config();
const connectDB = require('./config/MongoDB');

const app = require('./index');
connectDB();

app.get('/', (req, res) => {
    res.send('gabut suerrrrrrr')
});

app.listen(5000, "0.0.0.0", () => {
    console.log("Server berjalan di port 5000")
    console.log("Access http://localhost:5000")
})