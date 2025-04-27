import express from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Setup Multer to store the image on disk (instead of memory)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination folder where files will be temporarily stored
    cb(null, 'uploads/'); // Make sure to create the 'uploads' folder
  },
  filename: (req, file, cb) => {
    // Save the file with its original name
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Post route to handle image upload
router.post("/", upload.single("image"), async (req, res) => {
  // Check if file is provided
  if (!req.file) {
    return res.status(400).send({ message: "No image file provided" });
  }

  try {
    // Upload image to Cloudinary using the file path
    const result = await cloudinary.v2.uploader.upload(req.file.path, { resource_type: 'auto' });

    res.status(200).send({
      message: "Image uploaded successfully",
      image: result.secure_url,  // Get the secure URL from Cloudinary
    });

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default router;

