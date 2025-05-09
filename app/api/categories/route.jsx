// app/api/category/route.js
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";

export async function GET() {
  await connectDB();
  const categories = await Category.find().sort({ createdAt: -1 });
  return Response.json(categories);
}

export async function POST(request) {
  await connectDB();
  const { name, imageUrl } = await request.json();
  const category = await Category.create({ name, imageUrl });
  return Response.json(category);
}
