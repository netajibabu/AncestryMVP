const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Get all route files except index.js
const routeFiles = fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.endsWith('.routes.js'));

// Import and use all route files
routeFiles.forEach(file => {
  const routeName = path.basename(file, '.routes.js');
  const route = require(`./${file}`);
  router.use(`/${routeName}`, route);
});

module.exports = router; 