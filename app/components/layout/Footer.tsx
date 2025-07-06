// components/layout/Footer.tsx

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          {/* Column 1: Brand & Social */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold text-gray-800">
              ArtisanGlow
            </Link>
            <p className="text-gray-500">
              Handcrafted goods for a mindful home.
            </p>
            {/* You can add social media icons here */}
          </div>

          {/* Column 2: Shop Links */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Shop</h3>
            <ul className="space-y-2 text-gray-500">
              <li><Link href="/products" className="hover:text-gray-800 transition">All Products</Link></li>
              <li><Link href="/products?category=candles" className="hover:text-gray-800 transition">Candles</Link></li>
              <li><Link href="/products?category=pottery" className="hover:text-gray-800 transition">Pottery</Link></li>
              <li><Link href="/products?category=decor" className="hover:text-gray-800 transition">Home Decor</Link></li>
            </ul>
          </div>

          {/* Column 3: About Us Links */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Our Company</h3>
            <ul className="space-y-2 text-gray-500">
              <li><Link href="/about" className="hover:text-gray-800 transition">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-gray-800 transition">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-gray-800 transition">FAQ</Link></li>
            </ul>
          </div>

          {/* Column 4: Customer Service */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Customer Service</h3>
            <ul className="space-y-2 text-gray-500">
              <li><Link href="/shipping" className="hover:text-gray-800 transition">Shipping & Returns</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-gray-800 transition">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-gray-800 transition">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} ArtisanGlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}