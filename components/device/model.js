import mongoose from 'mongoose';

const DeviceSchema = new mongoose.Schema({
  name: { type: String, minlength: 4, maxlength: 40, trim: true, required: false },
  os: { type: String, enum: ['ios', 'android'], require: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Devices', DeviceSchema);
