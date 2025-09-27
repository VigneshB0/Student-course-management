const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import Routes
const studentRoute = require('./routes/student.routes');
const courseRoute = require('./routes/course.routes');
const authRoute = require('./routes/auth.routes');
const { seedAdmin } = require('./utils/seedUsers');
const dbURI = "mongodb+srv://vigneshviggu0001:vignesh123@cluster0.zmfmahv.mongodb.net/student-course-management";

mongoose.connect(dbURI)
  .then(() => {
    console.log('Database successfully connected to MongoDB Atlas!');
    // Seed admin user after database connection
    seedAdmin();
  })
  .catch(error => {
    console.log('Could not connect to database:', error);
  });


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Basic test route
app.get('/', (req, res) => {
  res.json({ message: 'Student Course Management API is running!' });
});

// API Routes
app.use('/api/auth', authRoute);
app.use('/api/students', studentRoute);
app.use('/api/courses', courseRoute);

// Error Handling
app.use((err, req, res, next) => {
  console.error('Error occurred:', err.message);
  console.error('Stack trace:', err.stack);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).json({ 
    error: err.message, 
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined 
  });
});

// Setup Server
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Server is running on port ' + port);
});