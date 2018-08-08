import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  device: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Devices', require: true }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Users', UserSchema);
