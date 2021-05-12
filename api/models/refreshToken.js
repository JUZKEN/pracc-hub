const mongoose = require('mongoose');

module.exports = mongoose.model('RefreshToken', new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '15d',
        required: true
    },
    createdByIp: String,
}, { timestamps: true }));