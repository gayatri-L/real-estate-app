require("dotenv").config();
const express = require("express");
const multer = require("multer");
const { Pool } = require("pg");
const cors = require("cors");
const sharp= require("sharp");// for image compression
<<<<<<< HEAD
 
const app = express();
 
 
=======
const path = require("path");

const app = express();


>>>>>>> origin/main
// ✅ Add CORS Middleware **Before Routes**
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    methods: "GET,POST",
    allowedHeaders: "Content-Type",
  })
);
<<<<<<< HEAD
=======
app.use("/uploads", express.static("uploads"));

>>>>>>> origin/main
// PostgreSQL Database Connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
  });
<<<<<<< HEAD
 
 
// Configure Multer to store images in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });
 
// API Endpoint to Upload Multiple Images with units
app.post("/multiple-upload",upload.array("files", 5), async (req, res) => {
  try {
 
    const {units} = req.body;
    // Validate units (must be a positive integer)
    if (!Number.isInteger(Number(units)) || units <= 0) {
        return res.status(400).json({ error: "Invalid units. It must be a positive integer." });
      }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }
 
    const insertQuery = `
      INSERT INTO multipleimages (filename, image, mimetype,units)
      VALUES ($1, $2, $3, $4) RETURNING *;
    `;
 
    const uploadedFiles = [];
 
    for (const file of req.files) {
      const { originalname, mimetype, buffer } = file;
       // Compress image using sharp (reduce quality to 70%)
       const compressedImage = await sharp(buffer)
       .resize(800) // Resize width to 800px (adjustable)
       .jpeg({ quality: 70 }) // Convert to JPEG & reduce quality
       .toBuffer();
      const result = await pool.query(insertQuery, [originalname, compressedImage, mimetype,units]);
      uploadedFiles.push(result.rows[0]);
    }
 
    res.json({ success: true, data: uploadedFiles });
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
 
// API Endpoint to Fetch All Image URLs
app.get("/all-images", async (req, res) => {
    try {
      const query = "SELECT * FROM multipleimages";
      const result = await pool.query(query);
 
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "No images found" });
      }
 
      const images = result.rows.map((row) => ({
        id: row.id,
        filename: row.filename,
        units: row.units,
        url: `http://localhost:5000/multipleimages/${row.id}`,
      }));
 
      res.json({ success: true, data: images });
    } catch (error) {
      console.error("Error fetching images:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
 
  // API Endpoint to Fetch Single Image
  app.get("/multipleimages/:id", async (req, res) => {
    try {
      const { id } = req.params;
 
      const query = "SELECT * FROM multipleimages WHERE id = $1";
      const result = await pool.query(query, [id]);
 
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Image not found" });
      }
 
      const { filename, image, mimetype, units } = result.rows[0];
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.setHeader("Content-Type", mimetype);
      res.setHeader("units", units);// Optional: Send units as a response header
      res.send(image);
    } catch (error) {
      console.error("Error fetching image:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
=======


// Configure Multer to store images in memory
// const storage = multer.memoryStorage();
// const upload = multer({ storage });
// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, "uploads/"); // Save images in the "uploads" folder
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage: storage });

// API Endpoint to Upload Multiple Images with units
// app.post("/multiple-upload",upload.array("files", 5), async (req, res) => {
//   try {

//     const {units} = req.body;
//     // Validate units (must be a positive integer)
//     if (!Number.isInteger(Number(units)) || units <= 0) {
//         return res.status(400).json({ error: "Invalid units. It must be a positive integer." });
//       }
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ error: "No files uploaded" });
//     }

//     const insertQuery = `
//       INSERT INTO multipleimages (filename, image, mimetype,units) 
//       VALUES ($1, $2, $3, $4) RETURNING *;
//     `;

//     const uploadedFiles = [];

//     for (const file of req.files) {
//       const { originalname, mimetype, buffer } = file;
//        // Compress image using sharp (reduce quality to 70%)
//        const compressedImage = await sharp(buffer)
//        .resize(800) // Resize width to 800px (adjustable)
//        .jpeg({ quality: 70 }) // Convert to JPEG & reduce quality
//        .toBuffer();
//       const result = await pool.query(insertQuery, [originalname, compressedImage, mimetype,units]);
//       uploadedFiles.push(result.rows[0]);
//     }

//     res.json({ success: true, data: uploadedFiles });
//   } catch (error) {
//     console.error("Error uploading images:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.post("/multiple-upload", upload.array("files", 5), async (req, res) => {
//   try {
//     const { units } = req.body;

//     // Validate units (must be a positive integer)
//     if (!Number.isInteger(Number(units)) || units <= 0) {
//       return res.status(400).json({ error: "Invalid units. It must be a positive integer." });
//     }

//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ error: "No files uploaded" });
//     }

//     // Compress and store images in an array
//     const compressedImages = await Promise.all(
//       req.files.map(async (file) => {
//         return await sharp(file.buffer)
//           .resize(800)
//           .jpeg({ quality: 70 })
//           .toBuffer();
//       })
//     );

//     // Insert into PostgreSQL
//     const insertQuery = `
//       INSERT INTO multipleimages (filename, images, mimetype, units) 
//       VALUES ($1, $2, $3, $4) RETURNING *;
//     `;
//     const result = await pool.query(insertQuery, [
//       req.files[0].originalname, // Use the first filename
//       compressedImages, // Store all images in one row
//       req.files[0].mimetype, // Use the first mimetype
//       units,
//     ]);

//     res.json({ success: true, data: result.rows[0] });
//   } catch (error) {
//     console.error("Error uploading images:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
// app.post("/multiple-upload", upload.array("files", 5), async (req, res) => {
//   try {
//       const { units } = req.body;

//       // Validate units (must be a positive integer)
//       if (!Number.isInteger(Number(units)) || units <= 0) {
//           return res.status(400).json({ error: "Invalid units. It must be a positive integer." });
//       }

//       if (!req.files || req.files.length === 0) {
//           return res.status(400).json({ error: "No files uploaded" });
//       }

//       const filenames = req.files.map(file => file.originalname);
//       const mimetypes = req.files.map(file => file.mimetype);

//       // Compress and store images as an array
//       const compressedImages = await Promise.all(req.files.map(async (file) => {
//           return await sharp(file.buffer)
//               .resize(800) // Resize width to 800px
//               .jpeg({ quality: 70 }) // Convert to JPEG & reduce quality
//               .toBuffer();
//       }));

//       // Insert multiple images in a single row
//       const insertQuery = `
//           INSERT INTO multipleimages (filename, mulimage, mimetype, units) 
//           VALUES ($1, $2, $3, $4) RETURNING *;
//       `;

//       const result = await pool.query(insertQuery, [filenames, compressedImages, mimetypes, units]);

//       res.json({ success: true, data: result.rows[0] });
//   } catch (error) {
//       console.error("Error uploading images:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//   }
// });
// app.post("/upload", upload.array("images", 10), async (req, res) => {
//   try {
//       const { units } = req.body;
//       const filenames = req.files.map((file) => file.filename);
//       console.log(filenames);
//       const query = "INSERT INTO multipleimages (units, mulimage) VALUES ($1, $2) RETURNING *";
//       const values = [units, filenames];

//       const result = await pool.query(query, values);
//       res.json({ success: true, data: result.rows });

//   } catch (error) {
//       console.error("Error uploading images:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//   }
// });
// app.post("/multipleimages", upload.array("mulimage", 10), async (req, res) => {
//   try {
//       console.log("Uploaded Files:", req.files.map(file => file.filename)); // ✅ Debugging

//       if (!req.files || req.files.length === 0) {
//           return res.status(400).json({ error: "No files uploaded" });
//       }

//       const insertQuery = `
//           INSERT INTO multipleimages (filename, mimetype, units, mulimage)
//           VALUES ($1, $2, $3, $4) RETURNING *;
//       `;

//       const uploadedImages = [];

//       for (const file of req.files) {
//           console.log("Inserting File:", file.filename, file.mimetype, file.path); // ✅ Debugging
          
//           const values = [file.filename, file.mimetype, req.body.units, file.path];

//           const result = await pool.query(insertQuery, values);
//           uploadedImages.push(result.rows[0]);
//       }

//       res.json({ success: true, data: uploadedImages });
//   } catch (error) {
//       console.error("Error uploading images:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//   }
// });
// app.post("/multipleimages", upload.array("mulimage", 10), async (req, res) => {
//   try {
//       console.log("Uploaded Files:", req.files.map(file => file.filename)); // Debugging

//       if (!req.files || req.files.length === 0) {
//           return res.status(400).json({ error: "No files uploaded" });
//       }

//       // Convert file paths to PostgreSQL-compatible array format
//       const filePaths = req.files.map(file => `'uploads/${file.filename}'`).join(","); // Format correctly

//       // PostgreSQL ARRAY syntax requires curly braces { }
//       const filePathsArray = `{${filePaths}}`;

//       console.log("File Paths for DB:", filePathsArray); // Debugging

//       const insertQuery = `
//           INSERT INTO multipleimages (filename, mimetype, units, mulimage)
//           VALUES ($1, $2, $3, $4) RETURNING *;
//       `;

//       const values = [
//           req.files[0].filename,   // Storing only first filename for reference
//           req.files[0].mimetype,   // Storing first file's mimetype
//           req.body.units,          // Units value from form
//           filePathsArray           // ✅ Insert properly formatted PostgreSQL ARRAY
//       ];

//       const result = await pool.query(insertQuery, values);

//       res.json({ success: true, data: result.rows });
//   } catch (error) {
//       console.error("Error uploading images:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//   }
// });
// API Endpoint to Fetch All Image URLs
// app.get("/all-images", async (req, res) => {
//     try {
//       const query = "SELECT * FROM multipleimages";
//       const result = await pool.query(query);
  
//       if (result.rows.length === 0) {
//         return res.status(404).json({ error: "No images found" });
//       }
  
//       const images = result.rows.map((row) => ({
//         id: row.id,
//         filename: row.filename,
//         units: row.units,
//         url: `http://localhost:5000/multipleimages/${row.id}`,
//       }));
  
//       res.json({ success: true, data: images });
//     } catch (error) {
//       console.error("Error fetching images:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   });
// app.get("/all-images", async (req, res) => {
//   try {
//     const query = "SELECT * FROM multipleimages";
//     const result = await pool.query(query);

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "No images found" });
//     }

//     const images = result.rows.map((row) => ({
//       id: row.id,
//       filename: row.filename,
//       units: row.units,
//       urls: row.images.map(
//         (img, index) => `http://localhost:5000/multipleimages/${row.id}/${index}`
//       ),
//     }));

//     res.json({ success: true, data: images });
//   } catch (error) {
//     console.error("Error fetching images:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
// app.get("/all-images", async (req, res) => {
//   try {
//     const query = "SELECT id, units, filename FROM multipleimages";
//     const result = await pool.query(query);

//     if (result.rows.length === 0) {
//       return res.json({ success: true, data: [] });
//     }

//     const groupedImages = {};

//     result.rows.forEach((row) => {
//       if (!groupedImages[row.id]) {
//         groupedImages[row.id] = { id: row.id, units: row.units, urls: [] };
//       }
//       groupedImages[row.id].urls.push(`http://localhost:5000/uploads/${row.filename}`);
//     });

//     res.json({ success: true, data: Object.values(groupedImages) });
//   } catch (error) {
//     console.error("Error fetching images:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
// app.post("/upload-multiple-images", upload.array("images"), async (req, res) => {
//   try {
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ error: "No images uploaded!" });
//     }

//     const { units } = req.body;
//     const filenames = req.files.map((file) => ({
//       filename: file.filename,
//       mimetype: file.mimetype, // Store MIME type
//     }));

//     // Step 1: Insert into `multipleimages` table (only units)
//     const result = await pool.query(
//       "INSERT INTO multipleimages (units) VALUES ($1) RETURNING id",
//       [units]
//     );

//     const projectId = result.rows[0].id;

//     // Step 2: Insert each image filename and mimetype into `image_files` table
//     for (const file of filenames) {
//       await pool.query(
//         "INSERT INTO image_fileses (project_id, filename, mimetype) VALUES ($1, $2, $3)",
//         [projectId, file.filename, file.mimetype]
//       );
//     }

//     res.json({
//       success: true,
//       message: "Images uploaded successfully!",
//       projectId,
//       filenames: filenames.map((file) => file.filename),
//     });
//   } catch (error) {
//     console.error("Error uploading images:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
// app.post("/upload", upload.array("images", 10), async (req, res) => {
//   try {
//       const { project_id, wing_id } = req.body;
//       const filenames = req.files.map((file) => file.filename); // Get all uploaded filenames

//       // Insert into DB with a single image_id
//       const query = `
//           INSERT INTO image_fileses (project_id, wing_id, filenames) 
//           VALUES ($1, $2, $3) RETURNING *;
//       `;
//       const values = [project_id, wing_id, filenames];

//       const result = await pool.query(query, values);
//       res.status(201).json(result.rows[0]);
//   } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: "Error uploading images" });
//   }
// });
// app.post("/upload", upload.array("images", 10), async (req, res) => {
//   try {
//       const { project_id, wing_id } = req.body;
//       const filenames = req.files.map((file) => file.filename); // Store multiple images as an array

//       // Insert into DB, ensuring wing_id is included
//       const query = `
//           INSERT INTO image_fileses (project_id, wing_id, filenames) 
//           VALUES ($1, $2, $3) RETURNING *;
//       `;
//       const values = [project_id, wing_id, filenames];

//       const result = await pool.query(query, values);
//       res.status(201).json(result.rows[0]);
//   } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: "Error uploading images" });
//   }
// });
app.post("/upload", upload.array("images", 10), async (req, res) => {
  try {
      const { project_id, wing_id } = req.body;
      const filenames = req.files.map((file) => file.filename); // Store multiple images
      const mimetypes = req.files.map((file) => file.mimetype); // Store mimetypes

      // Ensure filenames and mimetypes arrays are not empty
      if (!filenames.length || !mimetypes.length) {
          return res.status(400).json({ error: "No files uploaded" });
      }

      // Insert into database
      const query = `
          INSERT INTO image_fileses (project_id, wing_id, filename, mimetype) 
          VALUES ($1, $2, $3, $4) RETURNING *;
      `;

      // Insert each image separately
      const insertedImages = [];
      for (let i = 0; i < filenames.length; i++) {
          const values = [project_id, wing_id, filenames[i], mimetypes[i]];
          const result = await pool.query(query, values);
          insertedImages.push(result.rows[0]);
      }

      res.status(201).json(insertedImages);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error uploading images" });
  }
});

app.get("/all-images", async (req, res) => {
  try {
    const query = `
      SELECT mi.id, mi.units, 
             COALESCE(json_agg(if.filename) FILTER (WHERE if.filename IS NOT NULL), '[]') AS urls
      FROM multipleimages mi
      LEFT JOIN image_fileses if ON mi.id = if.project_id
      GROUP BY mi.id, mi.units
    `;

    const result = await pool.query(query);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


  // API Endpoint to Fetch Single Image
  // app.get("/multipleimages/:id", async (req, res) => {
  //   try {
  //     const { id } = req.params;
  
  //     const query = "SELECT * FROM multipleimages WHERE id = $1";
  //     const result = await pool.query(query, [id]);
  
  //     if (result.rows.length === 0) {
  //       return res.status(404).json({ error: "Image not found" });
  //     }
  
  //     const { filename, image, mimetype, units } = result.rows[0];
  //     res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  //     res.setHeader("Content-Type", mimetype);
  //     res.setHeader("units", units);// Optional: Send units as a response header
  //     res.send(image);
  //   } catch (error) {
  //     console.error("Error fetching image:", error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // });
  // app.get("/multipleimages/:id/:index", async (req, res) => {
  //   try {
  //     const { id, index } = req.params;
  
  //     const query = "SELECT * FROM multipleimages WHERE id = $1";
  //     const result = await pool.query(query, [id]);
  
  //     if (result.rows.length === 0) {
  //       return res.status(404).json({ error: "Image not found" });
  //     }
  
  //     const { filename, images, mimetype } = result.rows[0];
  
  //     if (!images[index]) {
  //       return res.status(404).json({ error: "Image index out of range" });
  //     }
  
  //     res.setHeader("Content-Disposition", `attachment; filename="${filename}-${index}.jpg"`);
  //     res.setHeader("Content-Type", mimetype);
  //     res.send(images[index]);
  //   } catch (error) {
  //     console.error("Error fetching image:", error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // });
//   app.get("/all-images", async (req, res) => {
//     try {
//         const query = "SELECT * FROM multipleimages";
//         const result = await pool.query(query);

//         if (result.rows.length === 0) {
//             return res.status(404).json({ error: "No images found" });
//         }

//         // const images = result.rows.map((row) => ({
//         //     id: row.id,
//         //     filename: row.filename,
//         //     units: row.units,
//         //     urls: row.mulimage?row.mulimage.map((_, index) => `http://localhost:5000/multipleimages/${row.id}/${index}`)
//         // }));
//         const images = result.rows.map((row) => ({
//           id: row.id,
//           filename: row.filename,
//           units: row.units,
//           urls: row.mulimage ? row.mulimage.map((_, index) => `http://localhost:5000/multipleimages/${row.id}/${index}`) : []
//       }));
//         res.json({ success: true, data: images });
//     } catch (error) {
//         console.error("Error fetching images:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// app.get("/all-images", async (req, res) => {
//   try {
//       const query = "SELECT id, units, mulimage FROM multipleimages";
//       const result = await pool.query(query);

//       if (result.rows.length === 0) {
//           return res.status(404).json({ error: "No images found" });
//       }

//       // Convert PostgreSQL array format to JavaScript array safely
//       // const imageData = result.rows.map(row => ({
//       //     id: row.id,
//       //     units: row.units,
//       //     urls: row.mulimage
//       //     ? row.mulimage.map(img => `http://localhost:5000/uploads/${img}`)
//       //     : []
//       const imageData = result.rows.map(row => ({
//         id: row.id,
//         urls: row.mulimage
//           ? row.mulimage.map(img => `http://localhost:5000/uploads/${img.replace(/['"]/g, '')}`)
//           : []
//       }));
      
//       // urls: row.mulimage ? row.mulimage.map(img => `http://localhost:5000/${img}`) : [] // Check for NULL
  

//       res.json({ success: true, data: imageData });
//   } catch (error) {
//       console.error("Error fetching images:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.get("/multipleimages/:id/:index", async (req, res) => {
//   try {
//       const { id, index } = req.params;

//       const query = "SELECT * FROM multipleimages WHERE id = $1";
//       const result = await pool.query(query, [id]);

//       if (result.rows.length === 0) {
//           return res.status(404).json({ error: "Image not found" });
//       }

//       const { filename, mulimage, mimetype } = result.rows[0];

//       if (!mulimage || mulimage.length <= index) {
//           return res.status(404).json({ error: "Image index out of range" });
//       }

//       const imageBuffer = Buffer.from(mulimage[index], "base64");


      
//       res.setHeader("Content-Disposition", `inline; filename="${filename}"`);
//       res.setHeader("Content-Type", mimetype[index]);
//       res.send(imageBuffer);
//   } catch (error) {
//       console.error("Error fetching image:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//   }
// });


>>>>>>> origin/main
  // API Endpoint to Fetch Images by Units
app.get("/images-by-units/:units", async (req, res) => {
    try {
      const { units } = req.params;
<<<<<<< HEAD
 
      if (!Number.isInteger(Number(units)) || units <= 0) {
        return res.status(400).json({ error: "Invalid units. It must be a positive integer." });
      }
 
      const query = "SELECT * FROM multipleimages WHERE units = $1";
      const result = await pool.query(query, [units]);
 
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "No images found for this unit count" });
      }
 
=======
  
      if (!Number.isInteger(Number(units)) || units <= 0) {
        return res.status(400).json({ error: "Invalid units. It must be a positive integer." });
      }
  
      const query = "SELECT * FROM multipleimages WHERE units = $1";
      const result = await pool.query(query, [units]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "No images found for this unit count" });
      }
  
>>>>>>> origin/main
      res.json({ success: true, data: result.rows });
    } catch (error) {
      console.error("Error fetching images by units:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
<<<<<<< HEAD
 
// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
 
=======
  app.get("/multipleimages/:unit_id", async (req, res) => {
    try {
        const { unit_id } = req.params;

        // Fetch the image array from PostgreSQL
        const query = "SELECT mulimage FROM multipleimages WHERE units = $1";
        const result = await pool.query(query, [unit_id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "No images found for this unit" });
        }

        // Convert the PostgreSQL array format {uploads/image1.jpg,uploads/image2.jpg} to a JavaScript array
        const imagePaths = result.rows[0].mulimage;
        
        // Convert file paths to full URLs
        const imageUrls = imagePaths.map(img => `http://localhost:5000/${img}`);

        res.json({ success: true, images: imageUrls });
    } catch (error) {
        console.error("Error fetching images:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
// app.get("/multipleimages/:id", async (req, res) => {
//   try {
//       const { id } = req.params;

//       // Query to get image details from the database
//       const query = "SELECT filename, image, mimetype, units FROM multipleimages WHERE id = $1";
//       const result = await pool.query(query, [id]);

//       // Check if image exists
//       if (result.rows.length === 0) {
//           return res.status(404).json({ error: "Image not found" });
//       }

//       // Extract image details
//       const { filename, image, mimetype, units } = result.rows[0];

//       // Set response headers
//       res.setHeader("Content-Disposition", `inline; filename="${filename}"`);
//       res.setHeader("Content-Type", mimetype);
//       res.setHeader("units", units); // Optional: Custom header

//       // Send image as binary data
//       res.send(image);
//   } catch (error) {
//       console.error("Error fetching image:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//   }
// });
app.get("/multipleimages/:id", async (req, res) => {
  try {
      const { id } = req.params;

      // Fetch images from the database
      const query = "SELECT filename FROM multipleimages WHERE id = $1";
      const result = await pool.query(query, [id]);

      if (result.rows.length === 0) {
          return res.status(404).json({ error: "Image not found" });
      }

      // Generate image URLs without extra quotes
      const images = result.rows.map(row => `http://localhost:5000/uploads/${row.filename}`);

      res.json({ success: true, images });
  } catch (error) {
      console.error("Error fetching images:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/uploads/:filename", async (req, res) => {
  try {
      const { filename } = req.params;
      const imagePath = `uploads/${filename}`; // Adjust this based on your storage

      // Set proper headers for image display
      res.setHeader("Content-Type", "image/jpeg"); // Adjust MIME type if needed
      res.sendFile(imagePath, { root: "." }); // Serve image file from your local folder
  } catch (error) {
      console.error("Error fetching image:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

  
// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
>>>>>>> origin/main
