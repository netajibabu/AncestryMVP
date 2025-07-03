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

// Get person by ID with parent information
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await db.query(`
      SELECT 
        p.*,
        f.first_name as father_first_name,
        f.last_name as father_last_name,
        m.first_name as mother_first_name,
        m.last_name as mother_last_name
      FROM persons p
      LEFT JOIN persons f ON p.father_id = f.id
      LEFT JOIN persons m ON p.mother_id = m.id
      WHERE p.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Person not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching person:', error);
    res.status(500).json({ 
      error: 'Failed to fetch person' 
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
    const { first_name, last_name, father_id, mother_id } = req.body;

    // Validate input
    if (!first_name || !last_name) {
      return res.status(400).json({ 
        error: 'First name and last name are required' 
      });
    }

    // Validate parent IDs if provided
    if (father_id) {
      const fatherCheck = await db.query('SELECT id FROM persons WHERE id = $1', [father_id]);
      if (fatherCheck.rows.length === 0) {
        return res.status(400).json({ error: 'Father not found' });
      }
    }

    if (mother_id) {
      const motherCheck = await db.query('SELECT id FROM persons WHERE id = $1', [mother_id]);
      if (motherCheck.rows.length === 0) {
        return res.status(400).json({ error: 'Mother not found' });
      }
    }

    // Insert person into database
    const result = await db.query(
      'INSERT INTO persons (first_name, last_name, father_id, mother_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [first_name, last_name, father_id || null, mother_id || null]
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