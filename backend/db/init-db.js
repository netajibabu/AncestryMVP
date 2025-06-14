const db = require('../config/database');
const fs = require('fs');
const path = require('path');

async function initializeDatabase() {
  try {
    // Read the SQL file
    const sql = fs.readFileSync(path.join(__dirname, 'init.sql'), 'utf8');

    // Execute the SQL
    await db.query(sql);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

// Run the initialization
initializeDatabase(); 