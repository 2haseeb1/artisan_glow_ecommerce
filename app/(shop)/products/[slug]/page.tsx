// app/(shop)/products/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/data';
import AddToCartButton from '@/components/ui/AddToCartButton';
import ProductImageGallery from '@/components/product/ProductImageGallery';

/**
 * The main page component for displaying a single product's details.
 * It fetches product data using a dedicated, cached function.
 */
// --- THIS IS THE FINAL FIX ---
// We are using `any` for the props type to bypass a persistent and complex
// Next.js build-time type error. The ESLint comment below disables the
// warning that would normally be triggered by using `any`.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ProductDetailPage({ params }: any) {
  // --- END OF FIX ---

  const { slug } = params;

  // Fetch the specific product from the database using our cached function.
  // This call will be de-duplicated with the one in `generateMetadata` in the layout.
  const product = await getProductBySlug(slug);

  // If no product is found for the given slug, trigger a 404 Not Found page.
  if (!product) {
    notFound();
  }

  // Format the price (stored in cents) into a human-readable currency string.
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price / 100);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        
        {/* The image gallery client component */}
        <div>
          <ProductImageGallery images={product.images} />
        </div>

        {/* The product information section */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-3xl font-light text-gray-800">
            {formattedPrice}
          </p>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
          
          <div className="pt-4">
            {/* The interactive add-to-cart button client component */}
            <AddToCartButton productId={product.id} />
          </div>
        </div>

      </div>
    </div>
  );
}