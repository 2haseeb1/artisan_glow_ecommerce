// app/about/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image';

// This is good practice for SEO
export const metadata: Metadata = {
  title: 'About Us | ArtisanGlow',
  description: 'Learn about the passion and craftsmanship behind ArtisanGlow.',
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16">
        
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Our Story</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ArtisanGlow was born from a simple desire: to bring warmth, beauty, and a touch of the handmade into every home.
          </p>
        </section>

        {/* Image and Mission Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/workshop.jpg" // You'll need to add an image here
              alt="An artisan's workshop with pottery and tools"
              width={800}
              height={600}
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Crafted with Passion</h2>
            <p className="text-gray-600 leading-relaxed">
              We believe that the items you surround yourself with should tell a story. Each product at ArtisanGlow is thoughtfully designed and meticulously handcrafted by skilled artisans who pour their heart and soul into their work. From our soothing soy candles to our unique ceramic pieces, every item is a celebration of craftsmanship.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to support small-scale artisans and bring their incredible work to a wider audience, while providing you with beautiful, high-quality goods that make your space feel more like you.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">What We Value</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Authenticity</h3>
              <p className="text-gray-600">Real materials, real hands, real passion. We celebrate the unique imperfections that make each piece one-of-a-kind.</p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Quality</h3>
              <p className="text-gray-600">We source the finest materials and partner with artisans who are masters of their craft to ensure every product is built to last.</p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
              <p className="text-gray-600">We are committed to mindful creation, using sustainable practices and materials whenever possible to protect our planet.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}