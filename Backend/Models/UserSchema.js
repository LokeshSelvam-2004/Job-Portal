const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    skill:{
        type: String,
        required: true

    },
    dob: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneno: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    linkedin:{
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    }
});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('User', userSchema);
