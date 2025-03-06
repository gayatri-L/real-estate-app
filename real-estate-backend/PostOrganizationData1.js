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

// 🟢 API: Insert data into Organization table
app.post("/insert-organization", async (req, res) => {
  try {
    const { org_name, org_email, org_contact, org_regi_num } = req.body;

    // Validation: Ensure required fields are provided
    if (!org_name || !org_email || !org_contact || !org_regi_num) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // Insert into Organization table
    const query = `
  INSERT INTO Organization (org_name, org_email, org_contact, org_regi_num)
  VALUES ($1, $2, $3, $4) RETURNING org_id;
`

    const values = [org_name, org_email, org_contact, org_regi_num];

    const result = await pool.query(query, values);
    const orgId = result.rows[0].org_id;

    res.status(201).json({ message: "Organization added successfully!", orgId });
  } catch (err) {
    if (err.code === '23505') {
      // PostgreSQL error code for unique constraint violation
      res.status(400).json({
        success: false,
        message: 'Organization with this email already exists. Please use a different email.'
      });
    }
    else {
      res.status(500).json({
        success: false,
        message: 'An error occurred while adding the organization.',
        error: err.message
      });
    }
    console.error("Error inserting organization:", err);
    res.status(500).send("Server Error");
  }
});

// Start the Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
