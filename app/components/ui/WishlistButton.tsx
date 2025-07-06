// components/ui/WishlistButton.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

type WishlistButtonProps = {
  productId: string;
};

export default function WishlistButton({ productId }: WishlistButtonProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleWishlistToggle = async () => {
    setIsSubmitting(true);
    setIsWishlisted(!isWishlisted);
    
    console.log(`TODO: Implement backend logic for product ID: ${productId}`);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist!');
    } catch (error) {
      // This is the fix: log the actual error for debugging
      console.error("Failed to update wishlist:", error);
      
      // Revert the optimistic update on failure
      setIsWishlisted(!isWishlisted);
      toast.error('Something went wrong!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.button
      onClick={handleWishlistToggle}
      disabled={isSubmitting}
      className="p-2 rounded-full bg-white bg-opacity-80 backdrop-blur-sm shadow-md"
      whileTap={{ scale: 1.2 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-600"
        fill={isWishlisted ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
        />
      </svg>
    </motion.button>
  );
}