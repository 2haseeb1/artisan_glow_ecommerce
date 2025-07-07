// app/(shop)/cart/page.tsx
import { auth } from '@/lib/auth';
import Link from 'next/link';
import Image from 'next/image';
import type { OrderItem, Product } from '@prisma/client';

type CartItemWithProduct = OrderItem & {
  product: Product;
};

export default async function CartPage() {
  const session = await auth();

  if (!session?.user) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-6">
          Please <Link href="/login" className="text-blue-600 hover:underline">sign in</Link> to view your cart.
        </p>
      </div>
    );
  }

  const cartItems: CartItemWithProduct[] = [];

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        {/* --- THIS IS THE FIX --- */}
        <p className="text-gray-600 mb-6">
          Looks like you haven&apos;t added anything to your cart yet.
        </p>
        {/* --- END OF FIX --- */}
        <Link href="/products" className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-900 transition">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-10">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12">
          {/* Cart Items */}
          <section className="lg:col-span-2">
            <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
              {cartItems.map((item: CartItemWithProduct) => (
                <li key={item.id} className="flex py-6">
                  <div className="flex-shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      width={100}
                      height={100}
                      className="h-24 w-24 rounded-md object-cover object-center"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3><Link href={`/products/${item.product.slug}`}>{item.product.name}</Link></h3>
                        <p className="ml-4">${(item.product.price / 100).toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500">Qty {item.quantity}</p>
                      <div className="flex">
                        <button type="button" className="font-medium text-blue-600 hover:text-blue-500">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order Summary */}
          <section className="mt-10 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-1 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">${(subtotal / 100).toFixed(2)}</dd>
              </div>
            </dl>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full rounded-md border border-transparent bg-gray-800 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-900"
              >
                Checkout
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}