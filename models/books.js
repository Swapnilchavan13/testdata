const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const BookSchema = new Schema({
  Title: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  DiscountPrice: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Book", BookSchema)
 