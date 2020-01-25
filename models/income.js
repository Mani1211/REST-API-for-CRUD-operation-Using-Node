const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Income = new Schema({
    date: {
        type: String
    },
    customerName: {
        type: String
    },
    customerPlace: {
        type: String
    },
    billNumber: {
        type: Number
    },
    numberOfAcre: {
        type: Number
    },
    costPerAcre: {
        type: Number
    },
    advance: {
        type: Number
    },
    totalAmount: {
        type: Number
    },
    balance: {
        type: Number
    },
    amountGiven: {
        type: Number
    },
})

module.exports= mongoose.model('Income', Income)