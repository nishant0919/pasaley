import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/userSchema';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  if (!email) return new Response('Missing email', { status: 400 });

  await connectDB();
  const user = await User.findOne({ email });

  if (!user) return new Response('User not found', { status: 404 });

  return new Response(JSON.stringify({
    isProfileComplete: user.isProfileComplete || false,
  }), { status: 200 });
}
