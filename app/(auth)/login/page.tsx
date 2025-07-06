// app/(auth)/login/page.tsx
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Helper component for the Google Sign-In button
function GoogleSignInButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    // When clicked, call signIn with 'google'. NextAuth handles the rest.
    // The user will be redirected to Google, then back to your app.
    signIn('google', { callbackUrl: '/' });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-3 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition disabled:opacity-50"
    >
      <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M46.125 24.5C46.125 22.875 45.9375 21.25 45.6562 19.7188H24.4688V28.3125H36.625C36.0625 31.25 34.25 33.6562 31.625 35.2812V40.8125H39.5C43.6875 37.0312 46.125 31.25 46.125 24.5Z" fill="#4285F4"/>
        <path d="M24.4688 47C30.9375 47 36.375 44.8438 39.5 40.8125L31.625 35.2812C29.4375 36.75 26.625 37.5 24.4688 37.5C18.6562 37.5 13.6875 33.875 12.0625 28.8438H3.875V34.4062C7.03125 41.8125 15.1875 47 24.4688 47Z" fill="#34A853"/>
        <path d="M12.0625 28.8438C11.5312 27.375 11.25 25.75 11.25 24.0938C11.25 22.4375 11.5312 20.8125 12.0625 19.3438V13.7812H3.875C1.71875 17.8125 0.5 22.8125 0.5 28.0938C0.5 33.375 1.71875 38.375 3.875 42.4062L12.0625 36.9375V28.8438Z" fill="#FBBC05"/>
        <path d="M24.4688 10.6875C27.9375 10.6875 30.25 11.875 31.5 13.0625L39.625 5.21875C36.375 2.3125 30.9375 0 24.4688 0C15.1875 0 7.03125 5.1875 3.875 12.5938L12.0625 18.1562C13.6875 13.125 18.6562 10.6875 24.4688 10.6875Z" fill="#EA4335"/>
      </svg>
      <span className="text-gray-700 font-medium">Continue with Google</span>
    </button>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  
  const searchParams = useSearchParams();
  const successMessage = searchParams.get('message');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError('Invalid email or password. Please try again.');
        console.error('Sign-in failed:', result.error);
      } else if (result?.ok) {
        router.push('/');
        router.refresh();
      }
    } catch (err) {
      console.error('An unexpected error occurred during sign-in:', err);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center mt-16 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Sign In</h1>
        <p className="text-gray-500 text-center mb-6">to your ArtisanGlow account</p>

        {successMessage && (
          <p className="bg-green-100 text-green-700 p-3 rounded mb-4">
            {successMessage}
          </p>
        )}
        {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</p>}
        
        {/* --- ADDED: Google Sign-In Button --- */}
        <div className="mb-6">
          <GoogleSignInButton />
        </div>

        <div className="relative flex items-center mb-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        {/* --- END OF ADDITION --- */}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-900 transition">
            Sign In with Email
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          {`Don't have an account?`}{' '}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}