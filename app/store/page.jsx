import React from "react";

async function getStoreSettings() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/store/settings`, { cache: "no-cache" });
    if (!res.ok) throw new Error('Failed to fetch settings');
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getCategories() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/categories`, { cache: "no-cache" });
    if (!res.ok) throw new Error('Failed to fetch categories');
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products`, { cache: "no-cache" });
    if (!res.ok) throw new Error('Failed to fetch products');
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function StorePage() {
  const settings = await getStoreSettings();
  const categories = await getCategories();
  const products = await getProducts();

  if (!settings) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1>Failed to load store settings 😞</h1>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center p-8"
      style={{
        backgroundColor: settings.primaryColor || "#000",
        color: settings.secondaryColor || "#fff",
        fontFamily: settings.fontFamily || "Arial, sans-serif",
      }}
    >
      <div className="flex flex-col items-center mb-10">
        {settings.logoUrl && (
          <img
            src={settings.logoUrl}
            alt="Store Logo"
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
        )}
        <h1 className="text-4xl font-bold">{settings.storeName}</h1>
      </div>

      <div className="w-full max-w-6xl">
        {categories.map((category) => (
          <div key={category._id} className="mb-12">
            <h2 className="text-3xl font-semibold mb-6">{category.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products
                .filter((product) => product.category?._id === category._id)
                .map((product) => (
                  <div
                    key={product._id}
                    className="p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                    style={{
                      backgroundColor: settings.secondaryColor || "#fff",
                      color: settings.primaryColor || "#000",
                    }}
                  >
                    <img
                      src={product.imageUrl || "https://via.placeholder.com/150"}
                      alt={product.title}
                      className="w-full h-40 object-cover rounded-md mb-4"
                    />
                    <h3 className="text-2xl font-semibold">{product.title}</h3>
                    <p className="mt-2 text-sm">{product.description}</p>
                    <p className="mt-4 font-bold text-lg">${product.price}</p>
                    <button
                      className="mt-4 px-4 py-2 rounded-md"
                      style={{
                        backgroundColor: settings.primaryColor,
                        color: settings.secondaryColor,
                      }}
                    >
                      Buy Now
                    </button>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-16 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} {settings.storeName || "My Store"} - All rights reserved.
      </footer>
    </div>
  );
}
