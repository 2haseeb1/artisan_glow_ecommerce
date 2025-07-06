// app/(shop)/products/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import AddToCartButton from '@/components/ui/AddToCartButton';
import ProductImageGallery from '@/components/product/ProductImageGallery';

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Image Gallery */}
        <div>
          {/* --- THIS IS THE FIX --- */}
          {/* Only pass the 'images' prop, as that is all the component expects. */}
          <ProductImageGallery images={product.images} />
          {/* --- END OF FIX --- */}
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-3xl font-light text-gray-800">
            ${(product.price / 100).toFixed(2)}
          </p>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
          
          <AddToCartButton productId={product.id} />
        </div>
      </div>
    </div>
  );
}