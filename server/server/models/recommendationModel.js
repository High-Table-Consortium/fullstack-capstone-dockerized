const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
    attraction_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attraction',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    dateRecommended: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Recommendation', recommendationSchema);