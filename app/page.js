// app/page.js
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Features />
      <Pricing />
      <Footer />
    </div>
  );
}
