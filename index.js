require('dotenv').config();
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const Book = require('./models/books')

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log((`MongoDb Connected : ${conn.connection.host}`))
  } catch (error) {
    process.exit(1)
  }
}

// Enable CORS for all routes
app.use(cors());

app.get('/', (req, res) => {
  res.send({Title: "HomePage"})
})

app.get('/add-note', async (req, res) => {
  try {
    await Book.insertMany([
    
    ])
    
  } catch (error) {
    console.log("err", + error)
  }
})

// Get single book by id
app.get('/books/:_id', async (req, res) => {
  try {
    const book = await Book.findById(req.params._id);
    
    if (book) {
      res.json(book)
    } else {
      res.send("Book not found")
    }
  } catch (error) {
    res.send(error.message)
  }
})

app.get('/books', async (req, res) => {
  const books = await Book.find();

  if (books) {
    res.json(books)
  } else {
    res.send("Something went wrong")
  }
})

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
  })
})
