import { MongoClient } from 'mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; 

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db();
  const stores = await db
    .collection('templates')
    .find({ userId: session.user.email })
    .sort({ createdAt: -1 })
    .toArray();

  return new Response(JSON.stringify(stores), { status: 200 });
}
