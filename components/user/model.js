import { Schema, Model } from 'mongoose';

const UserSchema = new Schema({
  device: [{ type: Schema.Types.ObjectId, ref: 'Devices' }],
  createdAt: { type: Date, default: Date.now },
});

export default Model('Users', UserSchema);
