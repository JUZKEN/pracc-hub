const mongoose = require('mongoose');

const Token = mongoose.model('Token', new mongoose.Schema({
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

module.exports = Token;