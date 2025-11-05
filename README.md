# File Uploader Application

A simple and elegant file uploader web application built with Node.js, Express, and Multer.

## Features

- ✨ Modern, responsive UI with drag-and-drop support
- 📤 Single file upload functionality
- 🎯 File size validation (5MB limit)
- 📊 Progress indicator during upload
- 🔗 Direct link to uploaded files
- 💅 Beautiful gradient design
- ⚡ Fast and lightweight

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Navigate to the project directory:
```bash
cd file-uploader
```

2. Install dependencies:
```bash
npm install
```

## Usage

1. Start the server:
```bash
npm start
```

2. Open your browser and navigate to:
```
http://localhost:3000
```

3. Upload files using either:
   - Drag and drop files into the upload area
   - Click the upload area to browse and select files

## Project Structure

```
file-uploader/
├── public/
│   └── index.html      # Frontend upload form
├── uploads/            # Uploaded files storage
├── server.js           # Express server and Multer configuration
├── package.json        # Project dependencies
└── README.md           # This file
```

## Configuration

### File Size Limit

The default maximum file size is 5MB. To change this, edit `server.js`:

```javascript
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // Change to 10MB
  }
});
```

### File Type Restrictions

To restrict specific file types, uncomment and modify the `fileFilter` section in `server.js`:

```javascript
fileFilter: (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|pdf/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Invalid file type.'));
  }
}
```

### Server Port

To change the default port (3000), modify the `PORT` variable in `server.js`:

```javascript
const PORT = 8080; // Change to your desired port
```

## API Endpoints

### POST /upload

Uploads a single file to the server.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: FormData with 'file' field

**Response:**
```json
{
  "success": true,
  "message": "File uploaded successfully!",
  "file": {
    "filename": "file-1234567890-123456789.jpg",
    "originalname": "photo.jpg",
    "size": 245632,
    "path": "/uploads/file-1234567890-123456789.jpg"
  }
}
```

## Development

To run the server with auto-restart on file changes:

```bash
npm run dev
```

(Requires `nodemon` which is included in devDependencies)

## Optional Improvements

- [ ] Add support for multiple file uploads
- [ ] Implement file type validation
- [ ] Store file metadata in a database
- [ ] Add user authentication
- [ ] Create a gallery view for uploaded files
- [ ] Implement file deletion functionality
- [ ] Add compression for uploaded images

## Troubleshooting

**Port already in use:**
- Change the PORT variable in `server.js` to a different port

**Files not uploading:**
- Check that the `uploads` folder exists and has write permissions
- Verify file size is under the 5MB limit
- Check browser console for error messages

**Cannot find module errors:**
- Run `npm install` to install all dependencies

## License

ISC

## Author

Your Name

---

Built with ❤️ using Node.js, Express, and Multer

