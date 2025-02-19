const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
app.use(express.json()); // Middleware to parse JSON request body

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


app.post("/add-wing-details", async (req, res) => {
    try {
      const { bhk2_type1_balcony, bhk2_type1_units } = req.body;
  
      // Check if required fields are provided
      if (bhk2_type1_balcony === undefined || bhk2_type1_units === undefined) {
        return res.status(400).json({ error: "BHK2 Type1 Balcony and Units are required." });
      }
  
      // Fetch the last inserted project_id from Project_Details table
      const projectResult = await pool.query("SELECT project_id FROM Project_Details ORDER BY project_id DESC LIMIT 1");
  
      if (projectResult.rows.length === 0) {
        return res.status(400).json({ error: "No Project details found. Please add Project details first." });
      }
  
      const lastProjectId = projectResult.rows[0].project_id; // Get the latest project_id
  
      // Insert data into Wing_Details table with the fetched project_id
      const query = `
        INSERT INTO Wing_Details (bhk2_type1_balcony, bhk2_type1_units, project_id)
        VALUES ($1, $2, $3) RETURNING *;
      `;
  
      const values = [bhk2_type1_balcony, bhk2_type1_units, lastProjectId];
  
      const result = await pool.query(query, values);
  
      res.status(201).json({
        message: "Wing details added successfully",
        data: result.rows[0],
      });
  
    } catch (err) {
      console.error("Error inserting data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
    // Start the Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});