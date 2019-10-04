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

async function getSelectedCourses(){
    return await Course
        .find({ tags: 'backend', isPublished: true})
        .sort({ name: 1})
        .select( {name: 1, author: 1});
}

async function getSelectedCourses2() {
    return await Course
        .find({ isPublished: true })
        .or([ {tags: 'frontend'}, {tags: 'backend'} ])
        .sort({ price: -1 })    // '-price'
        .select('name author price');
}

async function getSelectedCourses3() {
    return await Course
        .find({ isPublished: true })
        .or([
            { name: /.*by.*/i }, 
            { price: { $gte: 15 } }
        ])
        .sort('-price')
        .select('name author price')
}

async function run() {
    const res = await getSelectedCourses3();
    console.log(res);
}

run();