const express = require("express");
const { Pool } = require("pg");
const multer = require("multer");
const sharp = require("sharp");
require("dotenv").config();

const app = express();
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

// Test Database Connection
pool.connect()
  .then(() => console.log("Connected to PostgreSQL ✅"))
  .catch((err) => console.error("Connection error ❌", err));

// Multer setup to handle multiple image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// API to update wing details (with optional image update)
app.put("/update-wing-details/:id", upload.array("bhk_2_type1_images", 5), async (req, res) => {
  try {
    const { wing_id } = req.params;
    const { bhk2_type1_balcony, bhk2_type1_units, filenames } = req.body;

    // Check if the wing detail exists
    const wingResult = await pool.query("SELECT * FROM wing_details WHERE wing_id = $1", [wing_id]);
    if (wingResult.rows.length === 0) {
      return res.status(404).json({ error: "Wing detail not found." });
    }

    let imageBuffers = [];
    let filenameArray = [];

    // Process and compress new images if uploaded
    if (req.files && req.files.length > 0) {
      imageBuffers = await Promise.all(
        req.files.map(async (file) => {
          const compressedImage = await sharp(file.buffer).resize(800).toBuffer();
          return `\\x${compressedImage.toString("hex")}`;
        })
      );

      filenameArray = filenames ? filenames.split(",") : req.files.map((file) => file.originalname);
    } else {
      // Keep existing images if no new images are uploaded
      imageBuffers = wingResult.rows[0].bhk_2_type1_images;
      filenameArray = wingResult.rows[0].filename;
    }

    // Update Wing_Details record
    const updateQuery = `
      UPDATE Wing_Details
      SET bhk2_type1_balcony = $1,
          bhk2_type1_units = $2,
          filename = $3,
          bhk_2_type1_images = $4
      WHERE wing_id = $5
      RETURNING *;
    `;

    const updateValues = [
      bhk2_type1_balcony || wingResult.rows[0].bhk2_type1_balcony,
      bhk2_type1_units || wingResult.rows[0].bhk2_type1_units,
      filenameArray,
      imageBuffers,
      wing_id,
    ];

    const updatedWing = await pool.query(updateQuery, updateValues);

    res.status(200).json({
      message: "Wing details updated successfully",
      data: updatedWing.rows[0],
    });
  } catch (err) {
    console.error("Error updating data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
