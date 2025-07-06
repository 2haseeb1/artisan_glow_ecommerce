// app/page.tsx
import { Suspense } from 'react';
import  {prisma}  from '@/lib/prisma';
import ProductCard from '@/components/product/ProductCard';
import ProductGridSkeleton from '@/components/product/ProductGridSkeleton';

// This is an async Server Component, allowing us to fetch data directly.
async function FeaturedProducts() {
  // Fetch the 8 most recent products to feature on the homepage.
  const products = await prisma.product.findMany({
    take: 8,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* A simple hero section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">Discover ArtisanGlow</h1>
        <p className="text-xl text-gray-600">Handcrafted with passion, for your home.</p>
      </section>

      {/* Featured products section with Suspense for loading state */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
        <Suspense fallback={<ProductGridSkeleton count={8} />}>
          <FeaturedProducts />
        </Suspense>
      </section>
    </div>
  );
}