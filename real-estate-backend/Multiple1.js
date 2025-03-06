require("dotenv").config();
const express = require("express");
const multer = require("multer");
const { Pool } = require("pg");
const cors = require("cors");
const sharp= require("sharp");// for image compression
const path = require("path");
const router = express.Router(); 
const app = express();


// ✅ Add CORS Middleware **Before Routes**
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    methods: "GET,POST",
    allowedHeaders: "Content-Type",
  })
);
app.use("/uploads", express.static("uploads"));

// PostgreSQL Database Connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
  });


// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Ensure the folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// POST API to Upload Multiple Images
router.post("/upload", upload.array("images", 10), async (req, res) => {
  try {
    const { project_id, wing_id } = req.body;
    const files = req.files;

    if (!project_id || !wing_id || !files || files.length === 0) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Extract filenames and mimetypes
    const filenames = files.map(file => file.filename);
    const mimetypes = files.map(file => file.mimetype);

    // Insert into PostgreSQL
    const query = `
      INSERT INTO image_fileses (project_id, wing_id, filenames, mimetype)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const values = [project_id, wing_id, filenames, mimetypes];
    const result = await pool.query(query, values);

    res.json({ message: "Images uploaded successfully", data: result.rows });
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({ error: "Server error" });
  }
});
router.get("/images/:project_id", async (req, res) => {
    try {
      const { project_id } = req.params;
  
      // Fetch image filenames based on project_id
      const query = `SELECT image_id, filenames FROM image_fileses WHERE project_id = $1`;
      const result = await pool.query(query, [project_id]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "No images found for this project" });
      }
  
      // Extract filenames
      const images = result.rows.map(row => ({
        image_id: row.image_id,
        filenames: row.filenames.map(filename => `http://localhost:5000/uploads/${filename}`), 
      }));
  
      res.json({ images });
    } catch (error) {
      console.error("Error fetching images:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
// ✅ Attach Router to App
app.use("/api", router);

// ✅ Start Express Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});