import { ObjectId, MongoClient } from 'mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; 

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const { id } = params;
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db();

  await db.collection('templates').deleteOne({
    _id: new ObjectId(id),
    userId: session.user.email,
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
