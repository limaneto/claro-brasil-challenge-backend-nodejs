const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Users', UserSchema);
