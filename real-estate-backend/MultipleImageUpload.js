require("dotenv").config();
const express = require("express");
const multer = require("multer");
const { Pool } = require("pg");
const cors = require("cors");
const sharp= require("sharp");// for image compression

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

// API Endpoint to Upload Multiple Images with units
app.post("/multiple-upload",upload.array("files", 5), async (req, res) => {
  try {

    const {units} = req.body;
    // Validate units (must be a positive integer)
    if (!Number.isInteger(Number(units)) || units <= 0) {
        return res.status(400).json({ error: "Invalid units. It must be a positive integer." });
      }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const insertQuery = `
      INSERT INTO multipleimages (filename, image, mimetype,units) 
      VALUES ($1, $2, $3, $4) RETURNING *;
    `;

    const uploadedFiles = [];

    for (const file of req.files) {
      const { originalname, mimetype, buffer } = file;
       // Compress image using sharp (reduce quality to 70%)
       const compressedImage = await sharp(buffer)
       .resize(800) // Resize width to 800px (adjustable)
       .jpeg({ quality: 70 }) // Convert to JPEG & reduce quality
       .toBuffer();
      const result = await pool.query(insertQuery, [originalname, compressedImage, mimetype,units]);
      uploadedFiles.push(result.rows[0]);
    }

    res.json({ success: true, data: uploadedFiles });
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API Endpoint to Fetch All Image URLs
app.get("/all-images", async (req, res) => {
    try {
      const query = "SELECT * FROM multipleimages";
      const result = await pool.query(query);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "No images found" });
      }
  
      const images = result.rows.map((row) => ({
        id: row.id,
        filename: row.filename,
        units: row.units,
        url: `http://localhost:5000/multipleimages/${row.id}`,
      }));
  
      res.json({ success: true, data: images });
    } catch (error) {
      console.error("Error fetching images:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // API Endpoint to Fetch Single Image
  app.get("/multipleimages/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const query = "SELECT * FROM multipleimages WHERE id = $1";
      const result = await pool.query(query, [id]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Image not found" });
      }
  
      const { filename, image, mimetype, units } = result.rows[0];
  
      res.setHeader("Content-Type", mimetype);
      res.setHeader("units", units);// Optional: Send units as a response header
      res.send(image);
    } catch (error) {
      console.error("Error fetching image:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  // API Endpoint to Fetch Images by Units
app.get("/images-by-units/:units", async (req, res) => {
    try {
      const { units } = req.params;
  
      if (!Number.isInteger(Number(units)) || units <= 0) {
        return res.status(400).json({ error: "Invalid units. It must be a positive integer." });
      }
  
      const query = "SELECT * FROM multipleimages WHERE units = $1";
      const result = await pool.query(query, [units]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "No images found for this unit count" });
      }
  
      res.json({ success: true, data: result.rows });
    } catch (error) {
      console.error("Error fetching images by units:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
