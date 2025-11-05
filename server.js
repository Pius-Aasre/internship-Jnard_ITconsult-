const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 1000;

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Files will be saved in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    // Add timestamp to filename to avoid overwriting
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});


// Initialize Multer with storage configuration
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // Limit file size to 5MB
  },
  fileFilter: (req, file, cb) => {
    // Optional: Filter file types (e.g., only images)
    // const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
    // const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    // const mimetype = allowedTypes.test(file.mimetype);
    
    // if (extname && mimetype) {
    //   return cb(null, true);
    // } else {
    //   cb(new Error('Invalid file type. Only images and documents are allowed.'));
    // }
    
    // Accept all file types for now
    cb(null, true);
  }
});

// Middleware to serve static files from the 'public' folder
app.use(express.static('public'));

// Middleware to serve uploaded files
app.use('/uploads', express.static('uploads'));

// Route to handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'No file uploaded.' 
      });
    }

    // File uploaded successfully
    res.json({
      success: true,
      message: 'File uploaded successfully!',
      file: {
        filename: req.file.filename,
        originalname: req.file.originalname,
        size: req.file.size,
        path: `/uploads/${req.file.filename}`
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error uploading file.', 
      error: error.message 
    });
  }
});

// Error handling middleware for Multer errors
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File is too large. Maximum size is 5MB.'
      });
    }
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
  
  if (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
  
  next();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Upload form available at http://localhost:${PORT}`);
});

