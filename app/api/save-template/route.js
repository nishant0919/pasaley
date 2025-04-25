import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // Adjust the import path as necessary
import { MongoClient } from 'mongodb';

export async function POST(req) {
  const session = await getServerSession(authOptions);
  const body = await req.json();

  if (!session) {
    return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), {
      status: 401,
    });
  }

  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const db = client.db();
    const result = await db.collection('templates').insertOne({
      ...body,
      userId: session.user.email, // can also use session.user.id
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ success: true, id: result.insertedId }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  } finally {
    await client.close();
  }
}
