const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  name: { type: String, minlength: 4, maxlength: 40, trim: true, required: false },
  os: { type: String, enum: ['ios', 'android'], require: true },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Devices', DeviceSchema);
