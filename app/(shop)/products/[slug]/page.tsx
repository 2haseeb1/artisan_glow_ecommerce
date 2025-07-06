// app/(shop)/products/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import AddToCartButton from '@/components/ui/AddToCartButton';
import ProductImageGallery from '@/components/product/ProductImageGallery';

// --- এই অংশটি যোগ করা হয়েছে ---
// এই ইন্টারফেসটি Next.js-কে props-এর সঠিক গঠন সম্পর্কে জানায়।
interface ProductPageProps {
  params: {
    slug: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}
// --- শেষ যোগ করা অংশ ---

// --- ফাংশন সিগনেচারটি আপডেট করা হয়েছে ---
export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = params;

  // Fetch the specific product from the database using its unique slug.
  const product = await prisma.product.findUnique({
    where: { slug },
  });

  // If no product is found for the given slug, show a 404 page.
  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Image Gallery */}
        <div>
          <ProductImageGallery images={product.images} />
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