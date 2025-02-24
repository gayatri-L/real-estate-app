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

//Fetch all Details
app.get("/filter-details", async (req, res) => {
  try {
      const query = `
          SELECT 
              pd.Project_Id, pd.Name AS Project_Name, pd.Location, pd.Parking,pd.latitude,pd.longitude,pd.budget, 
              pd.Contact_PhoneNumber AS Project_Phone,
              prd.ReraId, prd.Contact_Email, prd.Project_Name AS Rera_Project_Name, 
              prd.Project_Launch, prd.Contact_PhoneNumber AS Rera_Phone,
              wd.Wing_Id, wd.BHK2_Type1_Balcony, wd.BHK2_Type1_Units, 
              wd.Project_Id AS Wing_Project_Id,
              pd.BHK_1, pd.BHK_2, pd.BHK_3
          FROM Project_Details pd
          LEFT JOIN Project_ReraDetails prd ON pd.Project_Id = prd.ReraId
          LEFT JOIN Wing_Details wd ON pd.Project_Id = wd.Project_Id
      `;

      const result = await pool.query(query);
      res.json(result.rows);
  } catch (err) {
      console.error("Error fetching properties:", err);
      res.status(500).send("Server Error");
  }
});

// Start the Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
