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

app.post("/add-project-details", async (req, res) => {
    try {
      const { name, bhk_1, bhk_2, bhk_3, location, parking, contact_phonenumber } = req.body;
  
      // Check if required fields are provided
      if (!name || !location || !parking || !contact_phonenumber) {
        return res.status(400).json({ error: "Name, Location, Parking, and Contact Phone are required." });
      }
  
      // Fetch the last inserted rera_id from Project_ReraDetails table
      const reraResult = await pool.query("SELECT reraid FROM Project_ReraDetails ORDER BY reraid DESC LIMIT 1");
  
      if (reraResult.rows.length === 0) {
        return res.status(400).json({ error: "No RERA details found. Please add RERA details first." });
      }
  
      const lastReraId = reraResult.rows[0].reraid; // Get the latest rera_id
  
      // Insert data into Project_Details table with the fetched rera_id
      const query = `
        INSERT INTO Project_Details (name, bhk_1, bhk_2, bhk_3, location, parking, contact_phonenumber, rera_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;
      `;
  
      const values = [name, bhk_1 || false, bhk_2 || false, bhk_3 || false, location, parking, contact_phonenumber, lastReraId];
  
      const result = await pool.query(query, values);
  
      res.status(201).json({
        message: "Project details added successfully",
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
