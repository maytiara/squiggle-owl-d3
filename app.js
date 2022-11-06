// 1st: add the required packages
const express = require('express'); // express.js
const path = require ('path');
const app = express();
const PORT = process.env.PORT || 3001;

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // to Parse URL data from any form

// Subdirectory 'public/..'
app.use(express.static(path.join(__dirname,'public')));

// Wildcard for general get req of the app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public'))});

// Server setup
app.listen(PORT, () => {
  console.log(`Data Visualisation listening on ${PORT} 🚀`);
});


// create a single page for pie-chart with random dataset
// pie chart using D3 library
// create json file with 10-20 dataset with additional object attributes

// add regenerate button > once onClick new data will be generated 
// the new generated chart w/ 10 random data need to reflect the UI of it value

// have it responsive by fit the entire page and resize when it's on mobile mode
// add media query for diff media screen

// convert to typescript file