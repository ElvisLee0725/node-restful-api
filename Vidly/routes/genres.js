const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

// Define the schema at the 2nd argument of mongoose model
const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: 3,
        maxlength: 50
    }
}));


router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.post('/', async (req, res) => {
    const { error } = validateGenre(req.body);
    if(error) {
        return res.status(400).send('Please enter a valid genre');
    }
    let newGenre = new Genre({ name: req.body.name });
    newGenre = await newGenre.save();
    res.send(newGenre);
});

router.put('/:id', async (req, res) => {
    const { error } = validateGenre(req.body);
    if(error) {
        return res.status(400).send('Please enter a valid genre');
    }
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });

    if(!genre) {
        return res.status(404).send('The genre is not found');
    }
    res.send(genre);
});

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if(!genre) {
        return res.status(404).send('The genre is not found');
    }
    res.send(genres);
});


router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if(!genre) {
        return res.status(404).send('The genre is not found');
    }
    res.send(genre);
});

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(2).required()
    }
    return Joi.validate(genre, schema);
}

module.exports = router;