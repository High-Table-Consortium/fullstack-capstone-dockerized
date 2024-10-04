const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);