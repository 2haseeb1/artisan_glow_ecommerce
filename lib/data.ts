
// lib/data.ts

import { prisma } from './prisma';
import { cache } from 'react';

/**
 * A dedicated, cached function to fetch a single product by its unique slug.
 * 
 * This function is wrapped in React's `cache()` to automatically handle
 * request de-duplication. This means if this function is called multiple
 * times with the same `slug` during a single render pass (e.g., once in a
 * layout for metadata and once in a page for UI), the database will only
 * be queried ONCE. Subsequent calls will receive the cached result.
 * 
 * This is both a major performance optimization and the key to solving
 * the complex build-time type errors in Next.js.
 */
export const getProductBySlug = cache(async (slug: string) => {
  // This log is for debugging. In a production environment, you will see it
  // in your Vercel serverless function logs. It helps confirm caching is working,
  // as you should only see it appear once per page request.
  console.log(`Fetching product from database with slug: ${slug}`);
  
  const product = await prisma.product.findUnique({
    where: { 
      slug: slug 
    },
  });
  
  return product;
});

// You can add other data-fetching functions here as your application grows.
// For example:
/*
export const getFeaturedProducts = cache(async () => {
  console.log('Fetching featured products from database...');
  const products = await prisma.product.findMany({
    take: 8,
    orderBy: { createdAt: 'desc' },
  });
  return products;
});
*/