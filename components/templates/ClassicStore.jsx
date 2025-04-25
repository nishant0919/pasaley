export default function ClassicStore({ store }) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-6">
        <h1 className="text-3xl font-bold">{store.storeName}</h1>
        <p className="mt-4">{store.description}</p>
        {/* Add banner, products, contact etc. */}
      </div>
    );
  }
  