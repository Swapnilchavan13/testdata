const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require("cors")

const Image = require('./models/Image');

const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = 3000;


// MongoDB setup
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());

// Image storage setup
const storage = multer.diskStorage({
  destination: './public/images',
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Express middleware
app.use(express.json());
app.use(express.static('public'));

// API route for image upload

app.get('/', (req, res) => {
    res.send({Title: "HomePage"})
  })

app.post('/upload', upload.single('image'), async (req, res) => {
  const imagePath = `/images/${req.file.filename}`;
  try {
    const newImage = new Image({ imagePath });
    await newImage.save();
    res.json({ message: 'Image uploaded successfully', imagePath });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Image upload failed' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




// require('dotenv').config();
// const express = require("express")
// const mongoose = require("mongoose")
// const cors = require("cors")
// const Book = require('./models/books')

// const app = express();
// const PORT = process.env.PORT || 3000;

// mongoose.set('strictQuery', false);

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URL);
//     console.log((`MongoDb Connected : ${conn.connection.host}`))
//   } catch (error) {
//     process.exit(1)
//   }
// }

// // Enable CORS for all routes
// app.use(cors());

// app.get('/', (req, res) => {
//   res.send({Title: "HomePage"})
// })

// app.get('/add-note', async (req, res) => {
//   try {
//     await Book.insertMany([
    
//     ])
    
//     console.log("err", + error)
//   }
// })

// // Get single book by id
// app.get('/books/:_id', async (req, res) => {
//   try {
//   } catch (error) {
//     const book = await Book.findById(req.params._id);
    
//     if (book) {
//       res.json(book)
//     } else {
//       res.send("Book not found")
//     }
//   } catch (error) {
//     res.send(error.message)
//   }
// })

// app.get('/books', async (req, res) => {
//   const books = await Book.find();

//   if (books) {
//     res.json(books)
//   } else {
//     res.send("Something went wrong")
//   }
// })
// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Listening on port ${PORT}`)
//   })
// })

