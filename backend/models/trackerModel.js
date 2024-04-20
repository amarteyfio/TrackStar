const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const trackerSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    start_date: {
        type: Date,
        default: Date.now
    },
    end_date: {
        type: Date,
        required: false
    },
    notes: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false,
        default: 'In Progress'
    }
    
},{timestamps: true});


module.exports = mongoose.model('Tracker', trackerSchema);