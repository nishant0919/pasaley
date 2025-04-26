import { connectDB } from '@/lib/mongodb';
import Store from '@/models/Store';

export async function GET(req, { params }) {
  const { storeId } = params; // Get storeId from URL params

  // Connect to MongoDB
  await connectDB();

  try {
    // Log the storeId to debug
    console.log('Received storeId:', storeId);

    // Find the store by storeId in MongoDB (assuming 'storeId' is a field in the model)
    const store = await Store.findOne({ storeId }).exec();

    if (!store) {
      return new Response(
        JSON.stringify({ error: 'Store not found' }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(store), { status: 200 });
  } catch (error) {
    console.error('Error fetching store:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    );
  }
}
