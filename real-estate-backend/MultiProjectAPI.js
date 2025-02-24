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
// API Endpoint to fetch project details by org_id or org_name
app.get('/api/projects/details', async (req, res) => {
    try {
        let { org_id, org_name } = req.query; // Use let instead of const

        // Convert org_id to an integer (only if valid)
        org_id = org_id && !isNaN(org_id) ? parseInt(org_id, 10) : null;

        // Format org_name for case-insensitive search
        org_name = org_name ? `%${org_name}%` : null;

        const query = `
            SELECT 
                o.org_id, o.org_name, o.org_email,
                prd.reraid, prd.contact_email, prd.project_name, prd.project_launch, prd.contact_phonenumber AS rera_Contact,
                pd.project_id, pd.name AS project_name, pd.bhk_1, pd.bhk_2, pd.bhk_3, pd.location, pd.parking, pd.contact_phonenumber AS project_contact,
                wd.wing_id, wd.bhk2_type1_balcony, wd.bhk2_type1_units
            FROM project_reradetails prd
            JOIN project_details pd ON prd.reraid = pd.rera_id
            JOIN wing_details wd ON pd.project_id = wd.project_id
            JOIN organization o ON prd.org_id = o.org_id
            WHERE 
               ($1::INT IS NULL OR o.org_id = $1::INT) 
                 AND ($2::TEXT IS NULL OR o.org_name ILIKE $2::TEXT);
        `;

        const values = [org_id, org_name];

        const result = await pool.query(query, values);

        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching project details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
