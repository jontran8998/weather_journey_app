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

// Spin up the server
const server = app.listen(port, listening);
function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
};