const { User, validate } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');

// To get the current user's info. Usually we don't want to show id to the user, so use 'me' instead
// The the middleware authorization passed, then get the user object from id
router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Check if user is already registered
    let user = await User.findOne({ email: req.body.email });
    if(user) return res.status(400).send('User already registered!');

    // .pick(Object, Array of properties to keep)
    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);  // Generate the 'salt' for encrption
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    // Only send id, name, and email back to the user. Setup custom header with name 'x-auth-token'
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;