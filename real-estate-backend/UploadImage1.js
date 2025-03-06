require("dotenv").config();
const express = require("express");
const multer = require("multer");
const { Pool } = require("pg");
const cors = require("cors");
const sharp = require("sharp"); // Image compression

const app = express();

// ✅ Add CORS Middleware **Before Routes**
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    methods: "GET,POST",
    allowedHeaders: "Content-Type",
  })
);

// PostgreSQL Database Connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

// Configure Multer to store images in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ API Endpoint to Upload Image
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    let { units } = req.body;
    units = Number(units); // Convert to number

    // Validate `units` (must be a positive integer)
    if (!Number.isInteger(units) || units <= 0) {
      return res.status(400).json({ error: "Invalid units. It must be a positive integer." });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { originalname, mimetype, buffer } = req.file;

    // ✅ Compress Image before storing
    const compressedImage = await sharp(buffer).resize(800).jpeg({ quality: 70 }).toBuffer();

    const query = `
      INSERT INTO singleimages (filename, image, mimetype, units) 
      VALUES ($1, $2, $3, $4) RETURNING *;
    `;

    const values = [originalname, compressedImage, mimetype, units];

    const result = await pool.query(query, values);
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ API Endpoint to Get a Single Image by ID
app.get("/images/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const query = "SELECT * FROM singleimages WHERE id = $1";
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Image not found" });
    }

    const { filename, image, mimetype, units } = result.rows[0];

    res.setHeader("Content-Type", mimetype);
    res.setHeader("units", units);

    console.log("Sending image:", filename, mimetype, units); // Debugging

    res.send(image); // ✅ Ensure raw binary data is sent
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ API Endpoint to Get All Images (without binary data)
app.get("/images", async (req, res) => {
  try {
    const query = "SELECT id, filename, mimetype, units FROM singleimages"; // Exclude binary image data
    const result = await pool.query(query);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No images found" });
    }

    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Start Server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
