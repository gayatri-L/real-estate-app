
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

const app = express();
const PORT = 5000;

// PostgreSQL Connection
// ✅ PostgreSQL Database Connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
  });
  
// Middleware
app.use(cors());
app.use(bodyParser.json());

/** 
 *  📌 GET API: Fetch all projects
 *  Endpoint: http://localhost:5000/api/projects
 */
app.get("/api/projects", async (req, res) => {
  try {
    // const result = await pool.query("SELECT * FROM projects");
    const result = await pool.query("SELECT project_id, name, area, price, location, image FROM projects");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/** 
 *  📌 POST API: Add a new project
 *  Endpoint: http://localhost:5000/api/projects
 *  Example Request Body:
 *  {
 *    "name": "Luxury Heights",
 *    "area": "Mumbai",
 *    "price": 5000000
 *  }
 */
app.post("/api/projects", async (req, res) => {
  const { name, area, price,location, image } = req.body;
  if (!name || !area || !price || !location || !image) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO projects (name, area, price,location,image) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, area, price,location,image]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error adding project:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
