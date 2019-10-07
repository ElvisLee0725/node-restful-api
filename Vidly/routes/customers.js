const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {Customer, validate} = require('../models/customer');

router.get('/', async (req, res) => {
    const allCustomers = await Customer.find().sort('name');
    res.send(allCustomers);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) {
        return res.status(400).send('Please enter a valid customer');
    }
    let newCustomer = new Customer({ 
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    newCustoemr = await newCustomer.save();
    res.send(newCustomer);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if(error) {
        return res.status(400).send('Please enter a valid customer');
    }
    const customer = await Customer.findByIdAndUpdate(req.params.id, { 
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold  
    }, {
        new: true
    });

    if(!customer) {
        return res.status(404).send('The customer is not found');
    }
    res.send(customer);
});

router.delete('/:id', async (req, res) => {
    const c = await Customer.findByIdAndRemove(req.params.id);
    if(!c) {
        return res.status(404).send('The customer is not found');
    }
    res.send(c);
});

router.get('/:id', async (req, res) => {
    const c = await Customer.findById(req.params.id);
    if(!c) {
        return res.status(404).send('The customer is not found');
    }
    res.send(c);
});

module.exports = router;