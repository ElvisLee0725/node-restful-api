const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging');       // Logging errors and exceptions
require('./startup/routes')(app);   // Setting up routes
require('./startup/db')();          // Connecting to database
require('./startup/config')();      // Checking environmental varialbe 
require('./startup/validation')();  // Importing Joi for validation

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
