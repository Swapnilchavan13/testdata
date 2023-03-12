require('dotenv').config();
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const Book = require('./models/books')

const app=express();
const PORT= process.env.PORT || 3000;

mongoose.set('strictQuery', false);

const connectDB =async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log((`MongoDb Connected : ${conn.connection.host}`))
    } catch (error) {
        process.exit(1)
    }
}

app.use(cors());

app.get('/', (req, res)=>{
res.send({Title:"HomePage"})
})

app.get('/add-note', async (req, res) => {
    try {
        await Book.insertMany([
            
        ])
        
    } catch (error) {
        console.log("err", + error)
    }
})

app.get('/books' ,async (req,res) => {
    const book = await Book.find();

if (book){
    res.json(book)
}else{
    res.send("Something went Wrong")
}
})
app.get('/books/:_id' ,async (req,res) => {
    const bookId = req.params._id;
    const book = await Book.findById(bookId);

    if (book){
        res.json(book)
    }else{
        res.status(404).send("Book not found")
    }
})

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })

})
