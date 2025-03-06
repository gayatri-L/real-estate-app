// // const express = require("express");
// // const { Pool } = require("pg");
// // require("dotenv").config();

// // const app = express();
// // app.use(express.json()); // Middleware to parse JSON request body

// // const pool = new Pool({
// //   user: process.env.DB_USER,
// //   host: process.env.DB_HOST,
// //   database: process.env.DB_NAME,
// //   password: process.env.DB_PASS,
// //   port: process.env.DB_PORT,
// // });

// // // Test Database Connection
// // pool.connect()
// //   .then(() => console.log("Connected to PostgreSQL ✅"))
// //   .catch((err) => console.error("Connection error ❌", err));


// // app.post("/add-wing-details", async (req, res) => {
// //     try {
// //       const { bhk2_type1_balcony, bhk2_type1_units } = req.body;
  
// //       // Check if required fields are provided
// //       if (bhk2_type1_balcony === undefined || bhk2_type1_units === undefined) {
// //         return res.status(400).json({ error: "BHK2 Type1 Balcony and Units are required." });
// //       }
  
// //       // Fetch the last inserted project_id from Project_Details table
// //       const projectResult = await pool.query("SELECT project_id FROM Project_Details ORDER BY project_id DESC LIMIT 1");
  
// //       if (projectResult.rows.length === 0) {
// //         return res.status(400).json({ error: "No Project details found. Please add Project details first." });
// //       }
  
// //       const lastProjectId = projectResult.rows[0].project_id; // Get the latest project_id
  
// //       // Insert data into Wing_Details table with the fetched project_id
// //       const query = `
// //         INSERT INTO Wing_Details (bhk2_type1_balcony, bhk2_type1_units, project_id)
// //         VALUES ($1, $2, $3) RETURNING *;
// //       `;
  
// //       const values = [bhk2_type1_balcony, bhk2_type1_units, lastProjectId];
  
// //       const result = await pool.query(query, values);
  
// //       res.status(201).json({
// //         message: "Wing details added successfully",
// //         data: result.rows[0],
// //       });
  
// //     } catch (err) {
// //       console.error("Error inserting data:", err);
// //       res.status(500).json({ error: "Internal Server Error" });
// //     }
// //   });
// //     // Start the Server
// // const port = process.env.PORT || 5000;
// // app.listen(port, () => {
// //   console.log(`Server running on http://localhost:${port}`);
// // });const express = require("express");require("dotenv").config();
// const express = require("express");
// const { Pool } = require("pg");
// const multer = require("multer");
// require("dotenv").config();

// const app = express();
// app.use(express.json());

// // PostgreSQL connection
// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASS,
//   port: process.env.DB_PORT,
// });

// // Test Database Connection
// pool.connect()
//   .then(() => console.log("Connected to PostgreSQL ✅"))
//   .catch((err) => console.error("Connection error ❌", err));

// // Multer setup to handle multiple image uploads in memory
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// // API to add wing details with multiple images (in a single record)
// app.post("/add-wing-details", upload.array("bhk_2_type1_images", 5), async (req, res) => {
//   try {
//     const { bhk2_type1_balcony, bhk2_type1_units, filenames } = req.body;

//     if (!bhk2_type1_balcony || !bhk2_type1_units || !req.files || req.files.length === 0) {
//       return res.status(400).json({ error: "BHK2 Type1 Balcony, Units, and images are required." });
//     }

//     // Fetch the last inserted project_id
//     const projectResult = await pool.query("SELECT project_id FROM Project_Details ORDER BY project_id DESC LIMIT 1");

//     if (projectResult.rows.length === 0) {
//       return res.status(400).json({ error: "No Project details found. Please add Project details first." });
//     }

//     const lastProjectId = projectResult.rows[0].project_id;

//     // Prepare image array and filenames
//     const imageBuffers = req.files.map((file) => `\\x${file.buffer.toString("hex")}`);
//     const filenameArray = filenames ? filenames.split(",") : req.files.map((file) => file.originalname);

//     // Insert data into Wing_Details (image array in a single record)
//     const query = `
//       INSERT INTO Wing_Details (bhk2_type1_balcony, bhk2_type1_units, project_id, filename, bhk_2_type1_images)
//       VALUES ($1, $2, $3, $4, $5) RETURNING *;
//     `;

//     const values = [
//       bhk2_type1_balcony,
//       bhk2_type1_units,
//       lastProjectId,
//       filenameArray,
//       imageBuffers,
//     ];

//     const result = await pool.query(query, values);

//     res.status(201).json({
//       message: "Wing details with multiple images added successfully",
//       data: result.rows[0],
//     });

//   } catch (err) {
//     console.error("Error inserting data:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // API to get wing details (with images in base64 format)
// app.get("/get-wing-details", async (req, res) => {
//   try {
//     const query = "SELECT * FROM Wing_Details;";
//     const result = await pool.query(query);

//     // Convert images from bytea to base64 for better client-side use
//     const wingDetails = result.rows.map((row) => ({
//       ...row,
//       bhk_2_type1_images: row.bhk_2_type1_images.map((img) => Buffer.from(img, "hex").toString("base64")),
//     }));

//     res.status(200).json({
//       message: "Wing details fetched successfully",
//       data: wingDetails,
//     });

//   } catch (err) {
//     console.error("Error fetching data:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Start the Server
// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
// Required Packages

const express = require("express");
const { Pool } = require("pg");

// const multer = require("multer");
// const sharp = require("sharp");

require("dotenv").config();

const app = express();
app.use(express.json());

// PostgreSQL Connection
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

// Multer Setup (store images in memory)
//const upload = multer({ storage: multer.memoryStorage() });

// Serve Images as Static Files
// const imagePath = path.join(__dirname, "uploads");
// app.use("/uploads", express.static(imagePath));

// Ensure Upload Directory Exists
// const fs = require("fs");
// if (!fs.existsSync(imagePath)) {
//   fs.mkdirSync(imagePath);
// }

// // API to Add Wing Details with Image Compression
// app.post("/add-wing-details", upload.array("bhk_2_type1_images", 5), async (req, res) => {
//   try {
//     const { bhk2_type1_balcony, bhk2_type1_units } = req.body;

//     if (!bhk2_type1_balcony || !bhk2_type1_units || !req.files.length) {
//       return res.status(400).json({ error: "All fields (balcony, units, images) are required." });
//     }

//     // Get Latest Project ID
//     const projectResult = await pool.query("SELECT project_id FROM Project_Details ORDER BY project_id DESC LIMIT 1");
//     if (projectResult.rows.length === 0) {
//       return res.status(400).json({ error: "No project found. Add project first." });
//     }

//     const lastProjectId = projectResult.rows[0].project_id;

//     // Process Images with Sharp
//     const imageUrls = await Promise.all(
//       req.files.map(async (file, index) => {
//         const filename = `wing_${Date.now()}_${index}.webp`;
//         const outputPath = path.join(imagePath, filename);

//         // Compress and Save Image
//         await sharp(file.buffer)
//           .resize(800, 600) // Resize to 800x600 (Adjust as needed)
//           .toFormat("webp")
//           .toFile(outputPath);

//         return `/uploads/${filename}`; // Image URL
//       })
//     );

//     // Insert Wing Details with Image URLs
//     const query = `
//       INSERT INTO Wing_Details (bhk2_type1_balcony, bhk2_type1_units, project_id, bhk_2_type1_images)
//       VALUES ($1, $2, $3, $4) RETURNING *;
//     `;

//     const values = [
//       bhk2_type1_balcony,
//       bhk2_type1_units,
//       lastProjectId,
//       imageUrls
//     ];

//     const result = await pool.query(query, values);

//     res.status(201).json({
//       message: "Wing details added successfully",
//       data: result.rows[0],
//     });
//   } catch (err) {
//     console.error("Error inserting data:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// ✅ POST API to Add New Wing Detailsconst multer = require("multer");

// Configure Multer to store images in memory (for PostgreSQL BYTEA)

//const multer = require("multer");
// const sharp = require("sharp");

// Multer Configuration (Store in memory for compression)
//const storage = multer.memoryStorage();
//const upload = multer({ storage });
const multer = require("multer");
const sharp = require("sharp");app.use(express.json());

// Configure Multer (to handle multiple file uploads in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// ✅ Multiple Image Upload (with Compression and Units Validation)
app.post("/api/wing-details", upload.array("images", 5), async (req, res) => {
  try {
    const { wing_id, bhk2_type1_units, project_id } = req.body;

    // Validate essential fields
    if (!wing_id) {
      return res.status(400).json({ error: "wing_id is required" });
    }

    if (!Number.isInteger(Number(bhk2_type1_units)) || bhk2_type1_units <= 0) {
      return res.status(400).json({
        error: "Invalid bhk2_type1_units. It must be a positive integer.",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "At least one image is required." });
    }

    // Prepare the query
    const insertQuery = `
      INSERT INTO wing_details (wing_id, bhk2_type1_units, project_id, bhk_2_type1_images, image_type)
      VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;

    const uploadedFiles = [];

    // Process and insert each image
    for (const file of req.files) {
      const { mimetype, buffer } = file;

      // Compress image using sharp (resize and reduce quality)
      const compressedImage = await sharp(buffer)
        .resize(800) // Resize width to 800px
        .jpeg({ quality: 70 }) // Convert to JPEG & compress to 70%
        .toBuffer();

      // Insert into the database
      const result = await pool.query(insertQuery, [
        wing_id,
        bhk2_type1_units,
        project_id || null,
        compressedImage,
        mimetype,
      ]);

      uploadedFiles.push(result.rows[0]);
    }

    res.status(201).json({ success: true, uploadedFiles });
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Serve Image by Wing ID (Dynamic Image Type)
app.get("/api/images/:wing_id", async (req, res) => {
  try {
    const { wing_id } = req.params;

    const result = await pool.query(
      "SELECT bhk_2_type1_images, image_type FROM wing_details WHERE wing_id = $1",
      [wing_id]
    );

    if (result.rows.length === 0 || !result.rows[0].bhk_2_type1_images) {
      return res.status(404).send("Image not found");
    }

    const { bhk_2_type1_images, image_type } = result.rows[0];

    // Dynamically set the correct image type (jpeg, png, etc.)
    res.setHeader("Content-Type", image_type);
    res.send(bhk_2_type1_images);
  } catch (error) {
    console.error("Error serving image:", error);
    res.status(500).send("Internal Server Error");
  }
});
const port = process.env.PORT || 5000;
// Start Server
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});

