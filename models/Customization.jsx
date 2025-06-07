import mongoose from 'mongoose';

const customizationSchema = new mongoose.Schema({
  branding: {
    primaryColor: String,
    fontFamily: String,
    brandName: String,
    brandLogo: String,
    brandFavicon: String,
    currency: String,
  },
  components: {
    topBarText: String,
    navbarStyle: String,
    footerStyle: String,
    bodyStyle: String,
  },
}, { timestamps: true });

export default mongoose.models.Customization || mongoose.model('Customization', customizationSchema);
