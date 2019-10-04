const express = require('express');
const router = express.Router();

app.get('/', (req, res) => {
    // res.send("Hello World!!!!!");
    res.render('index', {
        title: 'My Express App',
        message: 'Hello Express'
    });
});

module.exports = router;
