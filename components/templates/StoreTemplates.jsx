import React from 'react';

const StoreTemplate = ({ storeData }) => {
  // Fallback if the data is missing or undefined
  const products = storeData.products || [];
  const socialLinks = storeData.socialLinks || [];

  return (
    <div className={`bg-${storeData.theme === 'dark' ? 'gray-900' : 'white'}`}>
      <header className="p-4 bg-blue-500 text-white">
        <h1>{storeData.storeName}</h1>
        <p>{storeData.storeDescription}</p>
      </header>

      <section className="p-4">
        <h2 className="text-xl">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.length === 0 ? (
            <p>No products available.</p>
          ) : (
            products.map((product, index) => (
              <div key={index} className="border p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <h3 className="mt-2">{product.name}</h3>
                <p>{product.description}</p>
                <p className="font-bold">{product.price}</p>
              </div>
            ))
          )}
        </div>
      </section>

      <footer className="bg-gray-800 text-white p-4">
        <p>Follow us on social media</p>
        <div className="flex space-x-4">
          {socialLinks.length === 0 ? (
            <p>No social links available.</p>
          ) : (
            socialLinks.map((link, index) => (
              <a key={index} href={link} target="_blank" rel="noopener noreferrer">
                {link}
              </a>
            ))
          )}
        </div>
      </footer>
    </div>
  );
};

export default StoreTemplate;
