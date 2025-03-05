const express = require("express");
const multer = require("multer");
const { Pool } = require("pg");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// PostgreSQL Connection
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

// Multer Setup (Store images in 'uploads' folder)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

// ✅ POST: Add Wing Details with Images
app.post("/api/wing-details", upload.array("images", 10), async (req, res) => {
  try {
    const { bhk2_type1_balcony, bhk2_type1_units, project_id } = req.body;

    if (!project_id) {
      return res.status(400).json({ error: "Project ID is required" });
    }

    // Store image URLs
    const imageUrls = req.files.map((file) => `/uploads/${file.filename}`);

    // Insert data into the wing_details table
    const result = await pool.query(
      `INSERT INTO wing_details (bhk2_type1_balcony, bhk2_type1_units, bhk2_type1_images, project_id)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [bhk2_type1_balcony, bhk2_type1_units, imageUrls, project_id]
    );

    res.status(201).json({
      message: "Wing details and images uploaded successfully!",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error inserting wing details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ GET: Fetch Wing Details by wing_id
app.get("/api/wing-details/:wing_id", async (req, res) => {
  try {
    const { wing_id } = req.params;

    const result = await pool.query(
      `SELECT * FROM wing_details WHERE wing_id = $1`,
      [wing_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Wing details not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching wing details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Serve Uploaded Images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Start the Server
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
