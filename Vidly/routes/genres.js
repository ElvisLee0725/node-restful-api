const express = require('express');
const router = express.Router();
const Joi = require('joi');

const genres = [
    {
        id: 1,
        genre: 'Comedy'
    },
    {
        id: 2,
        genre: 'Drama'
    },
    {
        id: 3,
        genre: 'Horror'
    }
];

router.get('/', (req, res) => {
    res.send(genres);
});

router.get('/:id', (req, res) => {
    const target = genres.find((g) => g.id === parseInt(req.params.id));
    if(!target) {
        return res.status(404).send('The genre is not found');
    }
    res.send(target);
});

router.post('/', (req, res) => {
    const { error } = validateGenre(req.body);
    if(error) {
        return res.status(400).send('Please enter a valid genre');
    }
    const newGenre = {
        id: genres.length + 1,
        genre: req.body.genre
    };
    genres.push(newGenre);
    res.send(newGenre);
});

router.put('/:id', (req, res) => {
    const target = genres.find((g) => g.id === parseInt(req.params.id));
    if(!target) {
        return res.status(404).send('The genre is not found');
    }
    target.genre = req.body.genre;
    res.send(target);
});

router.delete('/:id', (req, res) => {
    const target = genres.find((g) => g.id === parseInt(req.params.id));
    if(!target) {
        return res.status(404).send('The genre is not found');
    }
    const index = genres.indexOf(target);
    genres.splice(index, 1);
    res.send(genres);
});

function validateGenre(genre) {
    const schema = {
        genre: Joi.string().min(2).required()
    }
    return Joi.validate(genre, schema);
}

module.exports = router;