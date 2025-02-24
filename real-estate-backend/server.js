// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const { Pool } = require("pg");

// const app = express();
// const port = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json()); // To parse JSON request body

// // PostgreSQL Database Connection
// const pool = new Pool({
//   user: process.env.DB_USER,      // Your PostgreSQL username
//   host: process.env.DB_HOST,      // Usually "localhost"
//   database: process.env.DB_NAME,  // Your database name
//   password: process.env.DB_PASS,  // Your PostgreSQL password
//   port: process.env.DB_PORT,      // Default PostgreSQL port is 5432
// });

// // Test Database Connection
// pool.connect()
//   .then(() => console.log("Connected to PostgreSQL ✅"))
//   .catch((err) => console.error("Connection error ❌", err));

// // API Route: Get Properties Based on Filters
// app.get("/properties", async (req, res) => {
//   try {
//     const { area, budget, bhk } = req.query;

//     let query = "SELECT * FROM properties WHERE 1=1"; // Dynamic query construction
//     let values = [];

//     if (area) {
//       query += " AND location = $1";
//       values.push(area);
//     }
//     if (budget) {
//       query += ` AND price <= $${values.length + 1}`;
//       values.push(budget);
//     }
//     if (bhk) {
//       query += ` AND bhk = $${values.length + 1}`;
//       values.push(bhk);
//     }

//     const result = await pool.query(query, values);
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server Error");
//   }
// });

// // Start the Server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

// ------Important------------
// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const { Pool } = require("pg");

// const app = express();
// const port = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json()); // To parse JSON request body

// // PostgreSQL Database Connection
// const pool = new Pool({
//   user: process.env.DB_USER,      // Your PostgreSQL username
//   host: process.env.DB_HOST,      // Usually "localhost"
//   database: process.env.DB_NAME,  // Your database name
//   password: process.env.DB_PASS,  // Your PostgreSQL password
//   port: process.env.DB_PORT,      // Default PostgreSQL port is 5432
// });

// // Test Database Connection
// pool.connect()
//   .then(() => console.log("Connected to PostgreSQL ✅"))
//   .catch((err) => console.error("Connection error ❌", err));

// // API Route: Get Properties Based on Filters
// app.get("/properties", async (req, res) => {
//   try {
//     const { area, location, budget, bhk } = req.query;
//     let query = "SELECT * FROM properties WHERE 1=1"; // Base query
//     let values = [];
    
//     // Dynamic Query Building
//     if (location) {
//       values.push(location);
//       query += ` AND location = $${values.length}`;
//     }
//     if (area) {
//       values.push(area);
//       query += ` AND area = $${values.length}`;
//     }
//     if (budget) {
//       values.push(parseInt(budget)); // Ensure it's a number
//       query += ` AND price <= $${values.length}`;
//     }
//     if (bhk) {
//       values.push(parseInt(bhk)); // Ensure it's a number
//       query += ` AND bhk = $${values.length}`;
//     }

//     const result = await pool.query(query, values);
//     res.json(result.rows);
//   } catch (err) {
//     console.error("Error fetching properties:", err);
//     res.status(500).send("Server Error");
//   }
// });

// // Start the Server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
// -----------Important-----------

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON request body

// PostgreSQL Database Connection
const pool = new Pool({
  user: process.env.DB_USER,      // Your PostgreSQL username
  host: process.env.DB_HOST,      // Usually "localhost"
  database: process.env.DB_NAME,  // Your database name
  password: process.env.DB_PASS,  // Your PostgreSQL password
  port: process.env.DB_PORT,      // Default PostgreSQL port is 5432
});

// Test Database Connection
pool.connect()
  .then(() => console.log("Connected to PostgreSQL ✅"))
  .catch((err) => console.error("Connection error ❌", err));

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
  if (bhkType) {
    if (bhkType ==="1" ) {
      query += ` AND pd.BHK_1 = TRUE`;
    } else if (bhkType === "2") {
      query += ` AND pd.BHK_2 = TRUE`;
    } else if (bhkType === "3") {
      query += ` AND pd.BHK_3 = TRUE`;
    }
  }

  try {
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).send("No data found for the specified filters");
    }

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Server Error");
  }
});

// Start the Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
