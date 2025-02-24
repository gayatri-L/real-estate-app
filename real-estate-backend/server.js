require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON

console.log("DB User:", process.env.DB_USER);
console.log("DB Password:", process.env.DB_PASS ? "Loaded" : "Missing");

// PostgreSQL Database Connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

// API to Fetch All Image URLs
app.get("/api/images", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name, encode(image, 'base64') AS image, mimetype FROM Images");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching images:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API to Fetch a Single Image by ID
app.get("/api/images/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM demo WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Image not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching image:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/image/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query("SELECT * FROM images WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Image not found" });
    }

    const image = result.rows[0];

    res.set("Content-Type", image.mimetype);
    res.send(image.image);
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).json({ error: "Failed to retrieve image" });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
