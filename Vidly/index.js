const mongoose = require('mongoose');
const express = require('express');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to MongoDB.'))
    .catch((err) => console.error('Could not connect to MongoDB...'));

// Tell app whenever the route starts with /api/genres, use genres route
app.use('/api/genres', genres);
app.use('/api/customers', customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}...`));
