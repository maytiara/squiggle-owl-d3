// 1st: add the required packages
const express = require('express'); // express.js
const { join } = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // to Parse URL data from any form

// Subdirectory 'public/..'
app.use(express.static(join(__dirname,'public')));

// Wildcard for general get req of the app
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public/index'))});

// Server setup
app.listen(PORT, () => {
  console.log(`Data Visualisation listening on ${PORT} 🚀`);
});