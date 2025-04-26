import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
  storeId: { type: String, required: true, unique: true },
  storeName: { type: String, required: true },
  storeDescription: { type: String },
  theme: { type: String, enum: ['dark', 'light'], default: 'light' },
  products: [
    {
      name: String,
      description: String,
      price: String,
      image: String,
    },
  ],
  socialLinks: [String],
});

export default mongoose.models.Store || mongoose.model('Store', storeSchema);
