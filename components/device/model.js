import mongoose from 'mongoose';
import User from '../user/model';

const DeviceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  name: { type: String, minlength: 4, maxlength: 40, trim: true, required: false },
  os: { type: String, enum: ['ios', 'android'], require: false },
  createdAt: { type: Date, default: Date.now },
});

DeviceSchema.pre('save', function (next) {
  User
    .findById(this.user, (err, user) => {
      user.devicesAmount += 1;
      user.save(() => next());
    });
});

export default mongoose.model('Devices', DeviceSchema);
