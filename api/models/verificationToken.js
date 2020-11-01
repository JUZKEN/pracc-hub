const mongoose = require('mongoose');

module.exports = mongoose.model('VerificationToken', new mongoose.Schema({
   userId: {
       type: mongoose.Schema.Types.ObjectId,
       required: true,
       ref: 'User'
   },
   token: {
       type: String,
       required: true
   },
   createdAt: {
       type: Date,
       required: true,
       default: Date.now,
       expires: 43200
   }

}, {timestamps: true}));