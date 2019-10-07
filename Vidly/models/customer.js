const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        requred: true,
        minlength: 2,
        maxlength: 60
    },
    phone: {
        type: String,
        requred: true,
        minlength: 8,
        maxlength: 20
    },
    isGold: {
        type: Boolean,
        default: false
    }
}));

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(2).max(60).required(),
        phone: Joi.string().min(8).max(20).required(),
        isGold: Joi.boolean()
    }
    return Joi.validate(customer, schema);
}

// exports equals to module.exports
exports.Customer = Customer;
exports.validate = validateCustomer;