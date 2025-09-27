const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// CREATE a student
router.post('/', async (req, res, next) => {
  try {
    const data = await Student.create(req.body);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// READ all students
router.get('/', async (req, res, next) => {
  try {
    const data = await Student.find();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// READ a single student by ID
router.get('/:id', async (req, res, next) => {
  try {
    const data = await Student.findById(req.params.id);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// UPDATE a student
router.put('/:id', async (req, res, next) => {
  try {
    const data = await Student.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// DELETE a student
router.delete('/:id', async (req, res, next) => {
  try {
    const data = await Student.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: data });
  } catch (error) {
    next(error);
  }
});

module.exports = router;