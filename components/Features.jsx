const features = [
  { title: 'Customizable Templates', description: 'Choose from a variety of templates.' },
  { title: 'Easy Drag & Drop', description: 'No coding required.' },
  { title: 'Mobile Ready', description: 'Works perfectly on phones and tablets.' },
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-100 dark:bg-gray-900 text-center">
      <h2 className="text-3xl font-bold mb-8">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {features.map((feature, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
