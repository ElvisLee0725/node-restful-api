const mongoose = require('mongoose');

// Connect to database
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connected to mongo-exercise'))
    .catch(() => console.error('Could not connect to mongo-exercise', err));


// Define the schema
const courseSchema = new mongoose.Schema({
    name: String,
    author: String, 
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});
// Create a model
const Course = mongoose.model('Course', courseSchema);
