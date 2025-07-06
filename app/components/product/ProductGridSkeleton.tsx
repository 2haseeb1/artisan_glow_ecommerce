// components/product/ProductGridSkeleton.tsx

/**
 * A reusable skeleton loader for a single product card.
 * This is kept as a separate component to keep the main export clean.
 */
function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
      {/* Image Placeholder */}
      <div className="aspect-w-3 aspect-h-4 bg-gray-200 sm:aspect-none sm:h-60"></div>
      
      {/* Content Placeholder */}
      <div className="flex flex-1 flex-col space-y-3 p-4">
        {/* Title Placeholder */}
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        {/* Description Placeholder */}
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        
        <div className="flex flex-1 flex-col justify-end pt-4">
          <div className="flex justify-between items-center">
            {/* Price Placeholder */}
            <div className="h-8 bg-gray-300 rounded w-1/4"></div>
            {/* Button Placeholder */}
            <div className="h-9 bg-gray-300 rounded-md w-1/3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}


/**
 * The main component that renders a grid of product card skeletons.
 * It accepts a `count` prop to determine how many placeholders to show.
 * The `animate-pulse` class on the container creates the shimmering effect.
 */
export default function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-pulse">
      {/* Create an array of the specified length and map over it to render skeletons */}
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}