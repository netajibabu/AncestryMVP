const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Create a pool connection to postgres (default database)
const pool = new Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: process.env.POSTGRES_PORT || 5432,
  database: 'postgres' // Connect to default postgres database first
});

async function initializeDatabase() {
  const client = await pool.connect();
  try {
    // Read the SQL file
    const sql = fs.readFileSync(path.join(__dirname, 'init.sql'), 'utf8');

    // Execute the SQL
    await client.query(sql);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

// Run the initialization
initializeDatabase(); 