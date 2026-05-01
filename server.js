require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/facilities", require("./routes/facilityRoutes")); // <— ή facilities.js
app.use("/api/games", require("./routes/gameRoutes"));         // <— ή games.js
app.use("/api/reservations", require("./routes/reservations"));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(process.env.PORT || 3000, () =>
            console.log(`Server running on https://boardgamebookingwebapp-x0ep.onrender.com${process.env.PORT || 3000}`)
        );
    })
    .catch(err => console.error("❌ MongoDB connection error:", err));

// Fallback for SPA
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});
