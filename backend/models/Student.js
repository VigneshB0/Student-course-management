const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let StudentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  }
}, {
  collection: 'students'
});

module.exports = mongoose.model('Student', StudentSchema);