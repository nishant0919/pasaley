import Link from 'next/link';

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-500 dark:from-gray-800 dark:to-gray-700 text-white py-20 text-center">
      <h1 className="text-5xl font-extrabold mb-4">Create Your Custom Website in Minutes</h1>
      <p className="text-xl mb-8">No coding skills required. Start selling your products online today.</p>
      <Link href="/auth/signin">
        <button className="bg-yellow-400 text-black px-6 py-3 rounded-full hover:bg-yellow-300 text-lg">Get Started</button>
      </Link>
    </section>
  );
};

export default Hero;
