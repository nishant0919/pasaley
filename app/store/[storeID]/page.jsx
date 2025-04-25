// app/store/[storeId]/page.jsx
import { MongoClient, ObjectId } from 'mongodb';
import ModernStore from '@/components/templates/ModernStore';
import ClassicStore from '@/components/templates/ClassicStore';
import MinimalistStore from '@/components/templates/MinimalistStore';

export const dynamic = 'force-dynamic'; // Disable caching to fetch fresh data

// Fetch store data from MongoDB by ID
async function getStoreData(storeId) {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();

    const db = client.db();
    const store = await db
      .collection('stores')  // Make sure it's the 'stores' collection
      .findOne({ _id: new ObjectId(storeId) });

    await client.close();
    return store;
  } catch (error) {
    console.error('❌ Error fetching store:', error);
    return null;
  }
}

export default async function StorePage({ params }) {
  const { storeId } = params;  // Get the storeId from URL params
  console.log('Fetching store for ID:', storeId);  // For debugging

  const store = await getStoreData(storeId);

  if (!store) {
    return (
      <div className="p-6 text-center text-red-500 text-lg">
        ❌ Store not found
      </div>
    );
  }

  // Map templateId to corresponding component
  const TemplateComponent = {
    template1: ModernStore,
    template2: ClassicStore,
    template3: MinimalistStore,
  }[store.templateId];

  if (!TemplateComponent) {
    return (
      <div className="p-6 text-center text-red-500 text-lg">
        ❌ Invalid template selected
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <TemplateComponent store={store} />
    </div>
  );
}
