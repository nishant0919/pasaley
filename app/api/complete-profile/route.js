import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/userSchema';

export async function POST(req) {
  const { email, storeName, contactNumber, template } = await req.json();
  await connectDB();

  await User.findOneAndUpdate(
    { email },
    {
      storeName,
      contactNumber,
      template,
      isProfileComplete: true,
    }
  );

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
  });
}
