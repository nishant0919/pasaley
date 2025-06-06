import mongoose from 'mongoose';

const StoreSettingsSchema = new mongoose.Schema({
  storeName: { type: String, required: true },
  logoUrl: { type: String },
  primaryColor: { type: String },
  secondaryColor: { type: String },
  fontFamily: { type: String },
});

const StoreSettings = mongoose.models.StoreSettings || mongoose.model('StoreSettings', StoreSettingsSchema);

export default StoreSettings;