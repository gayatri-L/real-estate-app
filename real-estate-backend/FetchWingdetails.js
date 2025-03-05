const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
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

pool.connect()
  .then(() => console.log("Connected to PostgreSQL ✅"))
  .catch((err) => console.error("Connection error ❌", err));
// ✅ Fetch Wing Details (with correct image URL)
app.get("/api/wing-details", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT wing_id, bhk2_type1_units, project_id
      FROM wing_details
    `);

    const host = req.headers.host; // Dynamic host
    const wingDetails = result.rows.map((wing) => ({
      wing_id: wing.wing_id,
      bhk2_type1_units: wing.bhk2_type1_units,
      project_id: wing.project_id,
      image_url: `http://${host}/api/images/${wing.wing_id}`, // Dynamic URL
    }));

    res.status(200).json(wingDetails);
  } catch (error) {
    console.error("Error fetching wing details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Serve Image by Wing ID
app.get("/api/images/:wing_id", async (req, res) => {
  try {
    const { wing_id } = req.params;
    const result = await pool.query(
      "SELECT bhk_2_type1_images FROM wing_details WHERE wing_id = $1",
      [wing_id]
    );

    if (result.rows.length === 0 || !result.rows[0].bhk_2_type1_images) {
      return res.status(404).send("Image not found");
    }

    const image = result.rows[0].bhk_2_type1_images;

    // Dynamic content-type
    const getImageType = (image) => {
      const signature = image.toString("hex", 0, 4);
      if (signature === "89504e47") return "image/png";
      if (signature.startsWith("ffd8")) return "image/jpeg";
      return "application/octet-stream";
    };

    const imageType = getImageType(image);
    res.setHeader("Content-Type", imageType);
    res.send(image); // Stream image
  } catch (error) {
    console.error("Error serving image:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start Server
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
