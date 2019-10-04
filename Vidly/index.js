const express = require('express');
const genres = require('./routes/genres');
const app = express();
app.use(express.json());

// Tell app whenever the route starts with /api/genres, use genres route
app.use('/api/genres', genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}...`));
