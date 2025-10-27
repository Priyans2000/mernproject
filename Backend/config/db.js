const mongoose = require('mongoose');
const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Database connection failed", error);
    }
}
module.exports = connectdb;