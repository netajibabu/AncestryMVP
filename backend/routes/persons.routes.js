const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all persons
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM persons ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching persons:', error);
    res.status(500).json({ 
      error: 'Failed to fetch persons' 
    });
  }
});

// Filter persons by name
router.post('/filter', async (req, res) => {
  try {
    const { first_name, last_name } = req.body;
    
    // Build the query based on provided filters
    let query = 'SELECT * FROM persons WHERE 1=1';
    const params = [];
    let paramCount = 1;

    if (first_name) {
      query += ` AND first_name ILIKE $${paramCount}`;
      params.push(`%${first_name}%`);
      paramCount++;
    }

    if (last_name) {
      query += ` AND last_name ILIKE $${paramCount}`;
      params.push(`%${last_name}%`);
      paramCount++;
    }

    query += ' ORDER BY created_at DESC';

    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error filtering persons:', error);
    res.status(500).json({ 
      error: 'Failed to filter persons' 
    });
  }
});

// Insert new person
router.post('/', async (req, res) => {
  try {
    const { first_name, last_name } = req.body;

    // Validate input
    if (!first_name || !last_name) {
      return res.status(400).json({ 
        error: 'First name and last name are required' 
      });
    }

    // Insert person into database
    const result = await db.query(
      'INSERT INTO persons (first_name, last_name) VALUES ($1, $2) RETURNING *',
      [first_name, last_name]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting person:', error);
    res.status(500).json({ 
      error: 'Failed to insert person' 
    });
  }
});

module.exports = router; 