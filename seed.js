require("dotenv").config();
const mongoose = require("mongoose");

// Import models
const Game = require("./models/Game");
const Facility = require("./models/Facility");

const games = [
  {
    title: "Pandemic",
    description: "A cooperative board game where you work as a specialized disease-fighting team to stop deadly diseases from spreading across the globe.",
    image: "/images/Pandemic.jpg"
  },
  {
    title: "Uno",
    description: "A classic color and number matching card game where the objective is to be the first player to empty your hand by matching cards to the discard pile's top card.",
    image: "/images/Uno.jpg"
  },
  {
    title: "Monopoly",
    description: "A classic multiplayer board game where players buy, sell, and trade properties around the board to build an empire and drive their opponents into bankruptcy.",
    image: "/images/Monopoly.jpg"
  },
  {
    title: "Chess",
    description: "A two-player, two-dimensional, abstract strategy board game played on an 8x8 checkered board with 64 squares.",
    image: "/images/Chess.jpg"
  }
];

const facilities = [
  {
    name: "Board Game Room 1",
    description: "A cozy room with space for up to 6 players",
    image: "/images/Room1.jpg"
  },
  {
    name: "Board Game Room 2",
    description: "Spacious room with large tables for 10 players",
    image: "/images/Room2.jpg"
  },
  {
    name: "VIP Board Game Lounge",
    description: "Private lounge for premium members with snacks and drinks",
    image: "/images/Vip_Room.jpg"
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    // Clear old data
    await Game.deleteMany({});
    await Facility.deleteMany({});
    console.log("🗑️ Old games & facilities deleted");

    // Insert new data
    await Game.insertMany(games);
    await Facility.insertMany(facilities);
    console.log("🌱 Database seeded with games & facilities!");

    process.exit();
  } catch (err) {
    console.error("❌ Error seeding database:", err);
    process.exit(1);
  }
}

seed();