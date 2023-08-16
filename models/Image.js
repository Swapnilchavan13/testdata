const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  filename: {
    type: String,
    required: true,
  },
  fileId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model('Image', ImageSchema);
