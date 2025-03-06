const multer = require("multer");
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Ensure the "uploads" directory exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Configure Multer to save images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// ✅ POST: Upload Images for a Specific image_id
app.post("/api/images", upload.array("images", 10), async (req, res) => {
  try {
    const { image_id } = req.body;
    if (!image_id) return res.status(400).json({ error: "image_id is required." });
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "At least one image is required." });
    }

    // Generate image URLs
    const imageUrls = req.files.map((file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`);

    // Check if image_id already exists
    const existing = await pool.query("SELECT image_url FROM wing_images WHERE image_id = $1", [image_id]);

    if (existing.rowCount > 0) {
      // Append new images to the existing array
      const updatedUrls = existing.rows[0].image_url.concat(imageUrls);
      await pool.query("UPDATE wing_images SET image_url = $1 WHERE image_id = $2", [updatedUrls, image_id]);
    } else {
      // Insert new record
      await pool.query("INSERT INTO wing_images (image_id, image_url) VALUES ($1, $2)", [image_id, imageUrls]);
    }

    res.status(200).json({
      success: true,
      message: "Images uploaded successfully.",
      image_id,
      imageUrls,
    });
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ GET: Retrieve Images by image_id
app.get("/api/images/:image_id", async (req, res) => {
  try {
    const { image_id } = req.params;
    const result = await pool.query("SELECT image_url FROM wing_images WHERE image_id = $1", [image_id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "No images found." });
    }

    res.status(200).json({
      image_id,
      images: result.rows[0].image_url,
    });
  } catch (error) {
    console.error("Error retrieving images:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ DELETE: Delete Images by image_id (Optional)
app.delete("/api/images/:image_id", async (req, res) => {
  try {
    const { image_id } = req.params;

    // Get images to delete from local storage
    const result = await pool.query("SELECT image_url FROM wing_images WHERE image_id = $1", [image_id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "No images found to delete." });
    }

    // Delete files from local storage
    result.rows[0].image_url.forEach((url) => {
      const filePath = path.join(__dirname, url.replace(`${req.protocol}://${req.get("host")}/`, ""));
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });

    // Delete database record
    await pool.query("DELETE FROM wing_images WHERE image_id = $1", [image_id]);
    res.status(200).json({ success: true, message: "Images deleted successfully." });
  } catch (error) {
    console.error("Error deleting images:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Start the Server
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
