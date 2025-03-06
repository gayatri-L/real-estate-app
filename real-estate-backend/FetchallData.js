const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// PostgreSQL Connection
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
app.use("/uploads", express.static("uploads"));

// ✅ GET: Fetch All Data (organization, project_reradetails, project_details, wing_details)
app.get("/api/full-details", async (req, res) => {
  try {
    const query = `
      SELECT 
        o.org_id,
        o.org_name,
        o.org_email,
        o.org_contact,
        o.org_regi_num,

        pr.reraid,
        pr.contact_email AS rera_contact_email,
        pr.project_name AS rera_project_name,
        pr.project_launch,
        pr.contact_phonenumber AS rera_contact_phonenumber,

        pd.project_id,
        pd.name AS project_name,
        pd.bhk_1,
        pd.bhk_2,
        pd.bhk_3,
        pd.location,
        pd.parking,
        pd.contact_phonenumber AS project_contact_phonenumber,
        pd.latitude,
        pd.longitude,
        pd.budget,

        wd.wing_id,
        wd.bhk2_type1_balcony,
        wd.bhk2_type1_units,
        wd.bhk2_type1_images

      FROM project_details pd
      JOIN project_reradetails pr ON pd.rera_id = pr.reraid
      JOIN organization o ON pr.org_id = o.org_id
      LEFT JOIN wing_details wd ON pd.project_id = wd.project_id
    `;

    const result = await pool.query(query);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No data found" });
    }


    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching full details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Start the Server
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
