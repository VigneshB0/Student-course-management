const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Debug middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// MongoDB connection
const dbURI = "mongodb+srv://vigneshviggu0001:vignesh123@cluster0.zmfmahv.mongodb.net/studentcoursedb";

mongoose.connect(dbURI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Course Schema
const courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  duration: { type: String, required: true },
  fee: { type: Number, required: true }
});

const Course = mongoose.model('Course', courseSchema);

// Student Schema  
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true }
});

const Student = mongoose.model('Student', studentSchema);

// Basic routes
app.get('/', (req, res) => {
  res.json({ message: 'Student Course Management API is running!' });
});

// Course routes
app.get('/api/courses', async (req, res) => {
  try {
    console.log('Fetching courses...');
    const courses = await Course.find();
    console.log('Found courses:', courses.length);
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/courses', async (req, res) => {
  try {
    console.log('Creating course:', req.body);
    const course = new Course(req.body);
    const savedCourse = await course.save();
    console.log('Course created:', savedCourse);
    res.status(201).json(savedCourse);
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ error: error.message });
  }
});

// Student routes
app.get('/api/students', async (req, res) => {
  try {
    console.log('Fetching students...');
    const students = await Student.find();
    console.log('Found students:', students.length);
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/students', async (req, res) => {
  try {
    console.log('Creating student:', req.body);
    const student = new Student(req.body);
    const savedStudent = await student.save();
    console.log('Student created:', savedStudent);
    res.status(201).json(savedStudent);
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});