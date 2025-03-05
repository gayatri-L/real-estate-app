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

// //Fetch all Details
// app.get("/filter-details", async (req, res) => {
//   try {
//       const query = `
//           SELECT 
//               pd.Project_Id, pd.Name AS Project_Name, pd.Location, pd.Parking,pd.latitude,pd.longitude,pd.budget, 
//               pd.Contact_PhoneNumber AS Project_Phone,
//               prd.ReraId, prd.Contact_Email, prd.Project_Name AS Rera_Project_Name, 
//               prd.Project_Launch, prd.Contact_PhoneNumber AS Rera_Phone,
//               wd.Wing_Id, wd.BHK2_Type1_Balcony, wd.BHK2_Type1_Units, wd.bhk_2_type1_images,wd.filename,
//               wd.Project_Id AS Wing_Project_Id,
//               pd.BHK_1, pd.BHK_2, pd.BHK_3
//           FROM Project_Details pd
//           LEFT JOIN Project_ReraDetails prd ON pd.Project_Id = prd.ReraId
//           LEFT JOIN Wing_Details wd ON pd.Project_Id = wd.Project_Id
//       `;

//       const result = await pool.query(query);
//       res.json(result.rows);
//   } catch (err) {
//       console.error("Error fetching properties:", err);
//       res.status(500).send("Server Error");
//   }
// });

// // Start the Server
// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
//});require("dotenv").config();
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const sharp = require("sharp");
//const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));

// PostgreSQL Database Connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

pool.connect()
  .then(() => console.log("Connected to PostgreSQL ✅"))
  .catch((err) => console.error("Connection error ❌", err));

// Helper: Parse Filename (CSV or JSON Array)
const parseFilename = (filename) => {
  try {
    if (!filename) return [];

    if (Buffer.isBuffer(filename)) {
      filename = filename.toString("utf8");
    }

    if (typeof filename !== "string") {
      console.warn("Invalid filename type (not a string):", filename);
      return [];
    }

    if (filename.startsWith("[") && filename.endsWith("]")) {
      return JSON.parse(filename);
    }

    return filename.split(",").map((item) => item.trim());
  } catch (err) {
    console.warn("Error parsing filename:", err);
    return [];
  }
};

// Helper: Compress and Save Image
const compressAndSaveImage = async (imageBuffer, filename) => {
  try {
    const outputPath = path.join(__dirname, "uploads", filename);

    // Validate image format
    const metadata = await sharp(imageBuffer).metadata();
    if (!metadata.format) {
      console.warn("Invalid image format:", metadata);
      return null;
    }

    await sharp(imageBuffer)
      .resize({ width: 800 }) // Resize image to width 800px
      .jpeg({ quality: 70 }) // Compress image to 70% quality
      .toFile(outputPath);

    return `/uploads/${filename}`;
  } catch (error) {
    console.error("Error compressing image:", error);
    return null;
  }
};

// Fetch all Details
app.get("/filter-details", async (req, res) => {
  try {
    const query = `
      SELECT 
        pd.Project_Id, pd.name AS Project_Name, pd.Location, pd.Parking, 
        pd.latitude, pd.longitude, pd.budget, 
        pd.Contact_PhoneNumber AS Project_Phone,
        prd.ReraId, prd.Contact_Email, prd.Project_Name AS Rera_Project_Name, 
        prd.Project_Launch, prd.Contact_PhoneNumber AS Rera_Phone,
        wd.Wing_Id, wd.BHK2_Type1_Balcony, wd.BHK2_Type1_Units, 
        wd.filename,
        wd.bhk_2_type1_images
      FROM Project_Details pd
      LEFT JOIN Project_ReraDetails prd ON pd.Project_Id = prd.ReraId
      LEFT JOIN Wing_Details wd ON pd.Project_Id = wd.Project_Id
    `;

    const result = await pool.query(query);

    const processedData = await Promise.all(result.rows.map(async (property) => {
      let images = [];

      // Handle images (base64 or file paths)
      if (property.bhk_2_type1_images) {
        const imageArray = parseFilename(property.bhk_2_type1_images);

        for (const image of imageArray) {
          if (image.startsWith("data:image")) {
            try {
              const imageBuffer = Buffer.from(image.split(",")[1], "base64");
              const filename = `${property.Project_Id}_${Date.now()}.jpg`;
              const imagePath = await compressAndSaveImage(imageBuffer, filename);
              if (imagePath) images.push(imagePath);
            } catch (imgError) {
              console.warn("Error processing base64 image:", imgError);
            }
          } else {
            images.push(`/uploads/${image}`);
          }
        }
      }

      return {
        ...property,
        bhk_2_type1_images: images,
        filename: parseFilename(property.filename),
      };
    }));

    console.log("Processed Data:", processedData);

    res.status(200).json(processedData);
  } catch (err) {
    console.error("Error fetching properties:", err);
    res.status(500).send("Server Error");
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
