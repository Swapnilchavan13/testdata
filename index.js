require('dotenv').config();
const express = require("express")
const mongoose = require("mongoose")
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

app.get('/', (req, res)=>{
res.send({Title:"HomePage"})
})

app.get('/add-note', async (req, res) => {
    try {
        await Book.insertMany([
            
            {
                title:"tisara",
                body:"hello ki body",
                image:"image hello ki",
                auther:"auther kon hai",
                pages:"pages kitne hai"
            } , {
                title:"fourth",
                body:"hello ki body",
                image:"image hello ki",
                auther:"auther kon hai",
                pages:"pages kitne hai"
            }


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

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })

})
