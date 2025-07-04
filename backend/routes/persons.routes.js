const express = require('express');
const router = express.Router();
const Person = require('../models/person');

// Create a new person
router.post('/', async (req, res) => {
  try {
    const person = new Person(req.body);
    const savedPerson = await person.save();
    res.status(201).json(savedPerson);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all persons
router.get('/', async (req, res) => {
  try {
    const persons = await Person.find();
    res.json(persons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a person by ID
router.get('/:id', async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) return res.status(404).json({ error: 'Person not found' });
    res.json(person);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a person by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedPerson = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedPerson) return res.status(404).json({ error: 'Person not found' });
    res.json(updatedPerson);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a person by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedPerson = await Person.findByIdAndDelete(req.params.id);
    if (!deletedPerson) return res.status(404).json({ error: 'Person not found' });
    res.json({ message: 'Person deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Filter persons by firstName and/or surName
router.post('/filter', async (req, res) => {
  try {
    const { firstName, surName } = req.body;
    const filter = {};
    if (firstName) filter.firstName = { $regex: firstName, $options: 'i' };
    if (surName) filter.surName = { $regex: surName, $options: 'i' };
    const persons = await Person.find(filter);
    res.json(persons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add multiple people at once
router.post('/bulk', async (req, res) => {
  try {
    const people = req.body;
    if (!Array.isArray(people) || people.length === 0) {
      return res.status(400).json({ error: 'Request body must be a non-empty array of people.' });
    }
    const inserted = await Person.insertMany(people);
    res.status(201).json(inserted);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router; 