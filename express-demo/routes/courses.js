const express = require('express');
const router = express.Router();

const courses = [
    {
        id: 1,
        name: 'English'
    },
    {
        id: 2,
        name: 'Mathmatics'
    },
    {
        id: 3,
        name: 'Programming'
    }
];

router.get('/', (req, res) => {
    res.send(courses);
});

router.get('/:id', (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course with given ID is not found');

    res.send(course);
});

router.post('/', (req, res) => {
    // Validate the input
    const { error } = validateCourse(req.body); // Destructure an object
    if(error) return res.status(400).send(result.error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

router.put('/:id', (req, res) => {
    // 1. Look up the course
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course with given ID is not found');

    // 2. Validate the input
    const { error } = validateCourse(req.body); // Destructure an object
    if(error) return res.status(400).send(result.error.details[0].message);

    // 3. Update the result
    course.name = req.body.name;
    res.send(course);
});

router.delete('/:id', (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course with given ID is not found');
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});

function validateCourse(course) {
    // Check if the user's input is valid by defining the schema with Joi
    const schema = {
        name: Joi.string().min(3).required()    // Must be string with at least 3 characters
    };

    return Joi.validate(course, schema);
}

module.exports = router;