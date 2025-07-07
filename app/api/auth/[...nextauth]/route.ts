// app/api/auth/[...nextauth]/route.ts  <- আপডেট করা ফাইল

import { handlers } from "@/lib/auth"; // নতুন auth.ts ফাইল থেকে handlers ইম্পোর্ট করুন
export const { GET, POST } = handlers;
