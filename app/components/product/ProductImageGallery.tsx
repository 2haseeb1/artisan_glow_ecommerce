// components/product/ProductImageGallery.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

type ProductImageGalleryProps = {
  images: string[];
};

export default function ProductImageGallery({ images }: ProductImageGalleryProps) {
  // --- THIS IS THE FIX ---
  // All hook calls MUST come at the top level of the component,
  // before any conditions or early returns.
  const [selectedIndex, setSelectedIndex] = useState(0);
  // --- END OF FIX ---

  // Now we can safely have our early return condition.
  if (!images || images.length === 0) {
    return (
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
        {/* A simple placeholder if no images are provided */}
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">No Image Available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse">
      {/* Thumbnail Images */}
      <div className="mx-auto mt-6 w-full max-w-2xl sm:block lg:max-w-none">
        <div className="grid grid-cols-4 gap-6">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4
                ${selectedIndex === index ? 'ring-2 ring-blue-500' : 'ring-1 ring-transparent'}`}
            >
              <span className="sr-only">Image {index + 1}</span>
              <Image
                src={image}
                alt={`Product thumbnail ${index + 1}`}
                fill // Use 'fill' for responsive images inside a relative parent
                sizes="(max-width: 640px) 25vw, 100px" // Provide sizes for optimization
                className="object-cover rounded-md"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Main Image Display */}
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="w-full h-full"
          >
            <Image
              priority={true} // Prioritize loading the main image
              src={images[selectedIndex]}
              alt={`Product image ${selectedIndex + 1}`}
              width={800}
              height={800}
              className="h-full w-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}