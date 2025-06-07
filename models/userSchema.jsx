import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: String,
  name: String,
  image: String,
  storeName: String,
  contactNumber: String,
  isProfileComplete: {
    type: Boolean,
    default: false,
  },
  template: {
    type: String,
    default: 'classic-grid', 
  },
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
