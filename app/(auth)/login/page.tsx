// app/(auth)/login/page.tsx
import { Suspense } from 'react';
import LoginForm from './LoginForm'; // <-- নতুন কম্পোনেন্টটি ইম্পোর্ট করুন

// একটি সাধারণ স্কেলিটন লোডার তৈরি করুন
function LoginFormSkeleton() {
  return (
    <div className="flex justify-center items-center mt-16 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md animate-pulse">
        <div className="h-8 bg-gray-300 rounded w-2/3 mx-auto mb-6"></div>
        <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
        <div className="h-10 bg-gray-200 rounded-md mb-6"></div>
        <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
        <div className="h-10 bg-gray-200 rounded-md mb-6"></div>
        <div className="h-12 bg-gray-400 rounded-md"></div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    // Suspense বাউন্ডারি যোগ করা হয়েছে
    <Suspense fallback={<LoginFormSkeleton />}>
      <LoginForm />
    </Suspense>
  );
}