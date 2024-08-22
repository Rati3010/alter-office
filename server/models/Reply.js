const mongoose = require('mongoose');

const ReplySchema = new mongoose.Schema({
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    commentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true },
});

module.exports = mongoose.model('Reply', ReplySchema);
