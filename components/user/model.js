import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Users', UserSchema);
