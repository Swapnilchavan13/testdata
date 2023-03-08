const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const BookSchema = new Schema ({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    }
    ,
    image:{
        type:String,
        required:true
    },
    auther:{
        type:String,
        required:true
    },
    pages:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Book", BookSchema)