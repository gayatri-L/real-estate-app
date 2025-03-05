require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// const upload = require("./multerConfig"); // Local upload configuration
// Ensure 'uploads' folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configure Multer to Store Images Locally
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Store images in 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

const upload = multer({ storage: storage });


console.log("DB User:", process.env.DB_USER);
console.log("DB Password:", process.env.DB_PASS ? "Loaded" : "Missing");

// PostgreSQL Database Connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

// // API to Fetch All Image URLs
// app.get("/api/images", async (req, res) => {
//   try {
//     const result = await pool.query("SELECT id, name, encode(image, 'base64') AS image, mimetype FROM Images");
//     res.json(result.rows);
//   } catch (err) {
//     console.error("Error fetching images:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // API to Fetch a Single Image by ID
// app.get("/api/images/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await pool.query("SELECT * FROM demo WHERE id = $1", [id]);
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "Image not found" });
//     }
//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error("Error fetching image:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
// app.get("/image/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const result = await pool.query("SELECT * FROM images WHERE id = $1", [id]);

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "Image not found" });
//     }

//     const image = result.rows[0];

//     res.set("Content-Type", image.mimetype);
//     res.send(image.image);
//   } catch (error) {
//     console.error("Error fetching image:", error);
//     res.status(500).json({ error: "Failed to retrieve image" });
//   }
// });

// // Start Server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
// API to insert project details
app.post("/addProject", async (req, res) => {
  try {
      const { name, location } = req.body;
      const newProject = await pool.query(
          "INSERT INTO project (name, location) VALUES ($1, $2) RETURNING *",
          [name, location]
      );
      res.json(newProject.rows[0]);
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Server Error" });
  }
});

// API to insert wing details along with images
// app.post("/addWing", upload.array("images", 10), async (req, res) => {
//   try {
//       const { bhk2_type1_balcony, bhk2_type1_units, project_id } = req.body;
//       const imageUrls = req.files.map((file) => `/uploads/${file.filename}`);

//       const newWing = await pool.query(
//           "INSERT INTO wing (bhk2_type1_balcony, bhk2_type1_units, project_id, bhk_2_type1_images) VALUES ($1, $2, $3, $4) RETURNING *",
//           [bhk2_type1_balcony, bhk2_type1_units, project_id, imageUrls]
//       );

//       res.json(newWing.rows[0]);
//   } catch (err) {
//       console.error(err.message);
//       res.status(500).json({ error: "Server Error" });
//   }
// });
// 🟢 POST API: Upload Wing with Multiple Images
app.post("/addWing", upload.array("bhk_2_type1_images", 10), async (req, res) => {
  try {
      const { bhk2_type1_balcony, bhk2_type1_units, project_id } = req.body;
      const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);

      const result = await pool.query(
          "INSERT INTO wing (bhk2_type1_balcony, bhk2_type1_units, project_id, bhk_2_type1_images) VALUES ($1, $2, $3, $4) RETURNING *",
          [bhk2_type1_balcony, bhk2_type1_units, project_id, JSON.stringify(imagePaths)]
      );

      res.json({ message: "Wing added successfully", wing: result.rows[0] });
  } catch (err) {
      console.error("❌ Error adding wing:", err);
      res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get Project Details by ID

// app.get("/getProject/:project_id", async (req, res) => {
//   try {
//       const { project_id } = req.params;
//       console.log("Received project_id:", project_id); // ✅ Debugging

//       const project = await pool.query("SELECT * FROM project WHERE project_id = $1", [project_id]);

//       if (project.rows.length === 0) {
//           return res.status(404).json({ error: "❌ Project not found" });
//       }

//       res.json(project.rows[0]);
//   } catch (err) {
//       console.error("❌ Server Error:", err.message);
//       res.status(500).json({ error: "Server Error" });
//   }
// });


// ✅ Get Wing Details by Project ID
// app.get("/getWing/:project_id", async (req, res) => {
//     try {
//         const { project_id } = req.params;
//         const wings = await pool.query("SELECT * FROM wing WHERE project_id = $1", [project_id]);
//         res.json(wings.rows);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ error: "Server Error" });
//     }
// });
// 🟢 GET API: Fetch Project & Its Wings
app.get("/getProject/:project_id", async (req, res) => {
  try {
      const { project_id } = req.params;

      // Fetch project details
      const projectResult = await pool.query("SELECT * FROM project WHERE project_id = $1", [project_id]);
      if (projectResult.rows.length === 0) {
          return res.status(404).json({ error: "Project not found" });
      }

      // Fetch associated wings
      const wingsResult = await pool.query("SELECT * FROM wing WHERE project_id = $1", [project_id]);

      res.json({
          project: projectResult.rows[0],
          wings: wingsResult.rows,
      });
  } catch (err) {
      console.error("❌ Error fetching project:", err);
      res.status(500).json({ error: "Server error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});