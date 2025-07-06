// components/product/ProductCard.tsx

import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@prisma/client'; // Import the Product type from Prisma
import AddToCartButton from '@/components/ui/AddToCartButton';
import WishlistButton from '@/components/ui/WishlistButton';

// Define the props the component expects
type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  // Format the price from cents to a displayable string (e.g., 2999 -> $29.99)
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price / 100);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg">
      <div className="aspect-w-3 aspect-h-4 bg-gray-200 sm:aspect-none sm:h-60">
        <Link href={`/products/${product.slug}`}>
          <Image
            src={product.images[0]} // Display the first image in the array
            alt={product.name}
            width={400}
            height={400}
            className="h-full w-full object-cover object-center transition-transform group-hover:scale-105"
          />
        </Link>
      </div>
      
      {/* Absolute positioned wishlist button */}
      <div className="absolute top-2 right-2 z-10">
        <WishlistButton productId={product.id} />
      </div>

      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-lg font-medium text-gray-900">
          <Link href={`/products/${product.slug}`}>
            {/* This empty span with absolute-inset-0 makes the entire card clickable */}
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-gray-500 truncate">{product.description}</p>
        
        <div className="flex flex-1 flex-col justify-end">
          <div className="flex justify-between items-center mt-4">
            <p className="text-lg font-semibold text-gray-800">{formattedPrice}</p>
            
            {/* The AddToCartButton is a client component, allowing it to be interactive */}
            {/* The `relative z-20` ensures it appears above the clickable link overlay */}
            <div className="relative z-20">
              <AddToCartButton productId={product.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}