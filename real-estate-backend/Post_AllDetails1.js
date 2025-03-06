const express = require("express");
require("dotenv").config();
const pool = require("./db");

const app = express();
app.use(express.json());


app.post("/add-full-details", async (req, res) => {
    const client = await pool.connect(); // Start a transaction
  
    try {
      await client.query("BEGIN"); // Begin transaction
  
      // Get data from request body
      const {
        org_name, org_email, org_contact, org_regi_num,  // Organization
        contact_email, project_name, project_launch, contact_phonenumber,  // Project_ReraDetails
        name, bhk_1, bhk_2, bhk_3, location, parking, project_contact_phonenumber,  // Project_Details
        bhk2_type1_balcony, bhk2_type1_units // Wing_Details
      } = req.body;
  
      // Insert into Organization Table
      const orgQuery = `
        INSERT INTO Organization (org_name, org_email, org_contact, org_regi_num)
        VALUES ($1, $2, $3, $4) RETURNING org_id;
      `;
      const orgResult = await client.query(orgQuery, [org_name, org_email, org_contact, org_regi_num]);
      const org_id = orgResult.rows[0].org_id; // Get inserted org_id
  
      // Insert into Project_ReraDetails Table
      const reraQuery = `
        INSERT INTO Project_ReraDetails (contact_email, project_name, project_launch, contact_phonenumber, org_id)
        VALUES ($1, $2, $3, $4, $5) RETURNING reraid;
      `;
      const reraResult = await client.query(reraQuery, [contact_email, project_name, project_launch, contact_phonenumber, org_id]);
      const rera_id = reraResult.rows[0].reraid; // Get inserted rera_id
  
      // Insert into Project_Details Table
      const projectQuery = `
        INSERT INTO Project_Details (name, bhk_1, bhk_2, bhk_3, location, parking, contact_phonenumber, rera_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING project_id;
      `;
      const projectResult = await client.query(projectQuery, [name, bhk_1, bhk_2, bhk_3, location, parking, project_contact_phonenumber, rera_id]);
      const project_id = projectResult.rows[0].project_id; // Get inserted project_id
  
      // Insert into Wing_Details Table
      const wingQuery = `
        INSERT INTO Wing_Details (bhk2_type1_balcony, bhk2_type1_units, project_id)
        VALUES ($1, $2, $3) RETURNING wing_id;
      `;
      const wingResult = await client.query(wingQuery, [bhk2_type1_balcony, bhk2_type1_units, project_id]);
      const wing_id = wingResult.rows[0].wing_id; // Get inserted wing_id
  
      await client.query("COMMIT"); // Commit transaction
  
      res.status(201).json({
        message: "All details inserted successfully",
        data: {
          organization: { org_id, org_name, org_email, org_contact, org_regi_num },
          project_rera: { rera_id, contact_email, project_name, project_launch, contact_phonenumber, org_id },
          project_details: { project_id, name, bhk_1, bhk_2, bhk_3, location, parking, project_contact_phonenumber, rera_id },
          wing_details: { wing_id, bhk2_type1_balcony, bhk2_type1_units, project_id }
        }
      });
  
    } catch (err) {
      await client.query("ROLLBACK"); // Rollback transaction in case of error
      console.error("Error inserting data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      client.release(); // Release the connection
    }
  });

