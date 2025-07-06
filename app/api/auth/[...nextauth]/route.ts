// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

/**
 * The main NextAuth configuration object.
 * This is where you define all authentication strategies, adapters, and callbacks.
 */
const { handlers, auth, signIn, signOut } = NextAuth({
  /**
   * The PrismaAdapter automatically syncs user and account data between NextAuth
   * and your PostgreSQL database via Prisma. When a user signs in with Google,
   * this adapter will create a User and an associated Account record.
   */
  adapter: PrismaAdapter(prisma),

  /**
   * Defines the different methods users can use to sign in.
   * The order here can affect the default login method on some built-in pages.
   */
  providers: [
    // 1. Google OAuth Provider
    GoogleProvider({
      // These IDs are fetched from your .env file for security.
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
      // You can request additional user data from Google here if needed.
      // authorization: { params: { scope: "openid email profile https://www.googleapis.com/auth/..." } },
    }),

    // 2. Email & Password Credentials Provider
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // This function is the core logic for validating credentials.
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null; // Reject if email or password is not provided.
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        // If no user is found with that email, or if they signed up via Google
        // (and thus don't have a password), reject the login.
        if (!user || !user.password) {
          return null;
        }

        // Use bcrypt to securely compare the provided password with the hashed one in the DB.
        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        return isPasswordValid ? user : null;
      },
    }),
  ],

  /**
   * The session strategy determines how user sessions are managed.
   * 'jwt' is recommended for modern applications and serverless environments.
   */
  session: {
    strategy: "jwt",
  },

  /**
   * Callbacks are powerful hooks to customize the authentication flow.
   * This is where we inject our custom data (like user ID and role) into the session.
   */
  callbacks: {
    // This callback runs whenever a JSON Web Token is created or updated.
    // The 'user' object is only available on the first sign-in.
    async jwt({ token, user }) {
      if (user) {
        // On initial sign-in, add custom properties to the token.
        token.id = user.id;
        token.role = user.role; // Your custom 'role' from the Prisma schema
      }
      return token;
    },

    // This callback runs whenever a session is accessed (e.g., via `auth()` or `useSession`).
    // It takes the data from the token and puts it into the session object.
    async session({ session, token }) {
      if (session.user) {
        // Transfer the custom properties from the token to the final session object.
        session.user.id = token.id as string;
        session.user.role = token.role; // TypeScript knows this exists because of `next-auth.d.ts`
      }
      return session;
    },
  },

  // Optional: You can specify custom pages for sign-in, sign-out, and error handling.
  // If not specified, NextAuth will use its default, unstyled pages.
  pages: {
    signIn: "/login",
    // error: '/auth/error', // Example for a custom error page
  },
});

// CRITICAL: Export the GET and POST handlers for the App Router to use.
export const { GET, POST } = handlers;

// Export the auth utilities for use in other server-side parts of your application.
export { auth, signIn, signOut };
