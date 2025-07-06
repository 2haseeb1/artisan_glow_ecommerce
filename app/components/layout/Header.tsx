// components/layout/Header.tsx

import Link from 'next/link';
import Image from 'next/image';
import { auth } from '@/api/auth/[...nextauth]/route'; // To get the user session


// A helper component for the cart icon to keep the logic clean
async function CartIcon() {
  const session = await auth();

  // If there's no user, the cart has 0 items.
  if (!session?.user?.id) {
    return (
      <Link href="/cart" className="relative p-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </Link>
    );
  }

  // Fetch the number of items in the user's cart.
  // This is a simplified example. A real app might use a dedicated Cart model.
  // For now, let's assume a count of 0 until we build the cart logic.
  const cartItemCount = 0; // Replace with: await prisma.cartItem.count({ where: { userId: session.user.id } });
  
  return (
    <Link href="/cart" className="relative p-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      {cartItemCount > 0 && (
        <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-blue-600 text-white text-xs items-center justify-center">
          {cartItemCount}
        </span>
      )}
    </Link>
  );
}

// The main Header component
export default async function Header() {
  // Fetch the user session to determine which links to show.
  const session = await auth();
  const user = session?.user;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Left Section: Logo and Main Navigation */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            ArtisanGlow
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/products" className="text-gray-600 hover:text-gray-900 transition">Shop</Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition">Our Story</Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition">Contact</Link>
          </div>
        </div>

        {/* Right Section: Auth and Cart */}
        <div className="flex items-center space-x-4">
          {user ? (
            // If user is logged in, show account link and sign out button
            <>
              <Link href="/account/profile" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition">
                {user.image ? (
                  <Image src={user.image} alt="User Avatar" width={28} height={28} className="rounded-full" />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                )}
                <span className="hidden sm:inline">Account</span>
              </Link>
              <form action={async () => {
                'use server';
                const { signOut } = await import('@/api/auth/[...nextauth]/route');
                await signOut({ redirectTo: '/' });
              }}>
                <button type="submit" className="text-gray-600 hover:text-gray-900 transition">Sign Out</button>
              </form>
            </>
          ) : (
            // If user is not logged in, show sign in link
            <Link href="/login" className="px-4 py-2 text-sm font-semibold text-white bg-gray-800 rounded-md hover:bg-gray-900 transition">
              Sign In
            </Link>
          )}

          {/* Separator */}
          <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>

          {/* Cart Icon */}
          <CartIcon />
        </div>
      </nav>
    </header>
  );
}