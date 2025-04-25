// models/productModel.js
import { ObjectId } from 'mongodb';

export const productSchema = {
  storeId: ObjectId,
  name: String,
  price: Number,
  description: String,
  imageUrl: String,
  createdAt: Date,
};
