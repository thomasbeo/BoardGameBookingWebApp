// config/db.js
const mongoose = require('mongoose');

const connectDB = async (mongoUri) => {
    try {
        await mongoose.connect(mongoUri, {
        // Mongoose 7 removes many options; keep minimal for compatibility
    });
    console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;