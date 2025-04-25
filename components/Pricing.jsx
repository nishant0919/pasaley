const plans = [
  { name: 'Basic', price: '$19/mo', desc: 'For beginners and individuals.' },
  { name: 'Pro', price: '$49/mo', desc: 'For growing businesses.' },
  { name: 'Enterprise', price: '$99/mo', desc: 'Advanced features and support.' },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 bg-blue-50 dark:bg-gray-950 text-center">
      <h2 className="text-3xl font-bold mb-8">Pricing</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {plans.map((plan, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded shadow">
            <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
            <p className="text-xl font-bold mb-2">{plan.price}</p>
            <p>{plan.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
