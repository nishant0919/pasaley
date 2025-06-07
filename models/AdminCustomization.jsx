import mongoose from 'mongoose';

const AdminCustomizationSchema = new mongoose.Schema({
  branding: {
    primaryColor: { type: String, default: '#000000' },
    fontFamily: { type: String, default: 'Arial, sans-serif' },
    brandName: { type: String, default: '' },
    brandLogo: { type: String, default: '' },      // Base64 or URL
    brandFavicon: { type: String, default: '' },   // Base64 or URL
    currency: { type: String, default: 'USD' },
  },
  components: {
    topBarText: { type: String, default: '' },
    navbarStyle: { type: String, enum: ['light', 'dark', 'colored'], default: 'light' },
    footerStyle: { type: String, enum: ['light', 'dark', 'minimal'], default: 'dark' },
    bodyStyle: { type: String, enum: ['default', 'boxed', 'wide'], default: 'default' },
  },
}, { timestamps: true });

export default mongoose.models.AdminCustomization || mongoose.model('AdminCustomization', AdminCustomizationSchema);
