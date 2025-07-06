// app/(shop)/products/page.tsx
import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/product/ProductCard';
import ProductGridSkeleton from '@/components/product/ProductGridSkeleton';

async function AllProducts() {
  const products = await prisma.product.findMany({
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

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">All Products</h1>
      
      {/* In a real app, a filter sidebar would go here */}
      
      <Suspense fallback={<ProductGridSkeleton count={12} />}>
        <AllProducts />
      </Suspense>
    </div>
  );
}