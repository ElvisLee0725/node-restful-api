const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');   // For logging http requests
const Joi = require('joi');
const express = require('express');
const courses = require('./routes/courses');
const home = require('./routes/home');
const app = express();
const logger = require('./middleware/logger');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));  // Serve static files such as CSS, images...
app.use(helmet());

app.use('/api/courses', courses);
app.use('/', home);

if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan is enabled');
}
dbDebugger('Connected to the database');

// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));

app.use(logger);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}...`));