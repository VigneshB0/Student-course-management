const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CourseSchema = new Schema({
  courseName: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  fee: {
    type: Number,
    required: true
  }
}, {
  collection: 'courses'
});

module.exports = mongoose.model('Course', CourseSchema);