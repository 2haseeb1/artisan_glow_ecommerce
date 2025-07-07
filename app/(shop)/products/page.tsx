// app/(shop)/products/page.tsx

import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/product/ProductCard';
import ProductGridSkeleton from '@/components/product/ProductGridSkeleton';
import type { Product } from '@prisma/client'; // <-- ধাপ ২: টাইপটি ইম্পোর্ট করুন

async function AllProducts() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* --- ধাপ ৩: এখানে টাইপটি যোগ করুন --- */}
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      {/* --- শেষ পরিবর্তন --- */}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">All Products</h1>
      
      <Suspense fallback={<ProductGridSkeleton count={12} />}>
        <AllProducts />
      </Suspense>
    </div>
  );
}