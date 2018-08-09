import mongoose from 'mongoose';
import User from '../user/model';

const DeviceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  name: { type: String, minlength: 4, maxlength: 40, trim: true, required: false },
  os: { type: String, enum: ['ios', 'android'], require: false },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Devices', DeviceSchema);
