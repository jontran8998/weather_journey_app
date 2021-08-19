// require express
const express = require('express');
// Cors for cross origin allowance
const cors = require('cors');


// start up an instance of app
const app = express();

// use express instead of bodyParser with higher version of express
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

/* Initializing the main project folder */
app.use(express.static('website'));

const port = 3000;

// create projectData object
const projectData = [{temperature: 18, date: 'Aug 18', userResponse: "That's great!"}];

// Set up GET route
app.get('/data', (req, res) => {
  res.send(projectData)
})

// Set up POST route
app.post('/addData', (req, res) => {
  // add data from request.body to array projectData
  projectData.push(req.body);

  // get last element postion of array
  const lastItem = projectData.length - 1;
  res.send(`data just added ${projectData[lastItem].temperature} + ${projectData[lastItem].date} + ${projectData[lastItem].userResponse}`);
})

// Spin up the server
const server = app.listen(port, () => {
  console.log(`server running on local host: ${port}`);
})