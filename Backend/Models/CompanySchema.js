const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    ceo: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    jobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jobs'
    }],
    passwordHash: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Company', companySchema);
