const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true  
    },
    salary: {
        type: Number,  
        required: true 
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company', 
        required: true
    },
    postedDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Jobs', jobSchema);
