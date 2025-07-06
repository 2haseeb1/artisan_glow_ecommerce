// components/ui/AddToCartButton.tsx
'use client';

import { useState, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

// Define the component's props
type AddToCartButtonProps = {
  productId: string;
};

export default function AddToCartButton({ productId }: AddToCartButtonProps) {
  // State to track if the item was successfully added
  const [isSuccess, setIsSuccess] = useState(false);
  // useTransition hook to manage the loading state without blocking the UI
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = async () => {
    // We use startTransition to wrap the async logic.
    // This tells React to keep the UI interactive while we wait for the server.
    startTransition(async () => {
      // Call our cart API endpoint.
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      if (response.ok) {
        // On success, show a toast and set the success state
        toast.success('Added to your cart!');
        setIsSuccess(true);
        // After 2 seconds, reset the button to its normal state
        setTimeout(() => setIsSuccess(false), 2000);
      } else {
        // On failure, show an error toast
        toast.error('Could not add to cart. Please try again.');
      }
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isPending || isSuccess}
      className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-800 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-gray-900 disabled:bg-gray-400"
      style={{ minWidth: '120px' }} // Set a minimum width to prevent layout shifts
    >
      <AnimatePresence mode="wait">
        {isPending ? (
          // 1. Loading State (Spinner)
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </motion.div>
        ) : isSuccess ? (
          // 2. Success State (Checkmark)
          <motion.div
            key="success"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
        ) : (
          // 3. Default State (Text)
          <motion.span
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Add to Cart
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}