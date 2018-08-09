import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  devicesAmount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Users', UserSchema);
