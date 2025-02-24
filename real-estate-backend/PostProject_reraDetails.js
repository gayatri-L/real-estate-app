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

  app.post("/add-rera-details", async (req, res) => {
    try {
      const { contact_email, project_name, project_launch, contact_phonenumber } = req.body;
  
      // Check if required fields are provided
      if (!contact_email || !project_name || !project_launch || !contact_phonenumber) {
        return res.status(400).json({ error: "All fields are required" });
      }

      if (!/^\d{10}$/.test(contact_phonenumber)) {
        return res.status(400).json({ error: "Contact number must be exactly 10 digits" });
      }
  
      // Fetch the last inserted org_id from the Organization table
      const orgResult = await pool.query("SELECT org_id FROM Organization ORDER BY org_id DESC LIMIT 1");
  
      if (orgResult.rows.length === 0) {
        return res.status(400).json({ error: "No organization found. Please add an organization first." });
      }
  
      const lastOrgId = orgResult.rows[0].org_id; // Get the latest org_id
  
      // Insert data into Project_ReraDetails table with the fetched org_id
      const query = `
        INSERT INTO Project_ReraDetails (contact_email, project_name, project_launch, contact_phonenumber, org_id)
        VALUES ($1, $2, $3, $4, $5) RETURNING *;
      `;
  
      const values = [contact_email, project_name, project_launch, contact_phonenumber, lastOrgId];
  
      const result = await pool.query(query, values);
  
      res.status(201).json({
        message: "Project RERA details added successfully",
        data: result.rows[0],
      });
  
    } catch (err) {
      if (err.code === "23505") {  // PostgreSQL unique violation error code
        return res.status(400).json({ error: "Contact number already exists. Please use a different number." });
      }
  
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  // Start the Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
