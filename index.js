const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const Image = require('./models/Image'); // Import the Image schema

const PORT = process.env.PORT;

mongoose.set('strictQuery', false);

const app = express();

// Set up mongoose connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const conn = mongoose.connection;

// Initialize GridFS
let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads'); // This collection name must match the one used in the GridFSStorage configuration
});

// Set up storage for multer using GridFS
const storage = new GridFsStorage({
  url: process.env.MONGO_URL,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: 'uploads', // Collection name in MongoDB
    };
  },
});

const upload = multer({ storage });

app.use(cors());

app.get('/' ,async (req, res) =>{
res.send({title:"Backend working"})
})

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const imageModel = new Image({
      filename: req.file.originalname,
      fileId: req.file.id,
    });

    await imageModel.save();

    res.json({ message: 'Image uploaded successfully', fileId: req.file.id });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Error uploading image' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
