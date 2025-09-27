const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const mongoose = require('mongoose');

// Middleware to validate ObjectId
const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid course ID format' });
  }
  next();
};

// CREATE a course
router.post('/', async (req, res, next) => {
  try {
    const data = await Course.create(req.body);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// READ all courses
router.get('/', async (req, res, next) => {
  try {
    const data = await Course.find();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// READ a single course by ID
router.get('/:id', validateObjectId, async (req, res, next) => {
  try {
    console.log('Getting course with ID:', req.params.id);
    const data = await Course.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(data);
  } catch (error) {
    console.error('Error in GET /:id:', error);
    next(error);
  }
});

// UPDATE a course
router.put('/:id', validateObjectId, async (req, res, next) => {
  try {
    console.log('Updating course with ID:', req.params.id);
    const data = await Course.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (!data) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(data);
  } catch (error) {
    console.error('Error in PUT /:id:', error);
    next(error);
  }
});

// DELETE a course
router.delete('/:id', validateObjectId, async (req, res, next) => {
  try {
    console.log('Deleting course with ID:', req.params.id);
    const data = await Course.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json({ msg: 'Course deleted successfully', data: data });
  } catch (error) {
    console.error('Error in DELETE /:id:', error);
    next(error);
  }
});

module.exports = router;