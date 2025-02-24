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

// API Route: Get Project, Wing, and Rera Details based on dynamic filters
app.get("/filter-details", async (req, res) => {
  const { location, bhkType } = req.query; // Get filter parameters

  let query = `
    SELECT 
      pd.Project_Id, pd.Name AS Project_Name, pd.Location, pd.Parking, pd.Contact_PhoneNumber AS Project_Phone,pd.BHK_1,pd.BHK_2,pd.BHK_3,
      prd.ReraId, prd.Contact_Email, prd.Project_Name AS Rera_Project_Name, prd.Project_Launch, prd.Contact_PhoneNumber AS Rera_Phone,
      wd.Wing_Id, wd.BHK2_Type1_Balcony, wd.BHK2_Type1_Units, wd.Project_Id AS Wing_Project_Id
    FROM 
      Project_Details pd
    LEFT JOIN 
      Project_ReraDetails prd ON pd.Project_Id = prd.ReraId
    LEFT JOIN 
      Wing_Details wd ON pd.Project_Id = wd.Project_Id
    WHERE 1=1`;  // Base query

  let values = [];

  // Dynamically build query based on filters
  if (location) {
    values.push(location);
    query += ` AND pd.Location = $${values.length}`;
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
