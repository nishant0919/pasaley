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

export async function DELETE(request) {
  await connectDB();
  const { id } = await request.json();
  await Category.findByIdAndDelete(id);
  return Response.json({ message: "Category deleted" });
}
