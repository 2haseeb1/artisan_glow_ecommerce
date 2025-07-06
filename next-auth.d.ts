// next-auth.d.ts

import { UserRole } from "@prisma/client"; // Import your Role enum from Prisma
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { DefaultSession, User } from "next-auth";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { JWT } from "next-auth/jwt";

/**
 * We are using module augmentation to extend the default types provided by next-auth.
 * This allows us to add our custom properties like `id` and `role` to the session
 * and token objects in a type-safe way.
 */
declare module "next-auth" {
  /**
   * Extends the built-in `User` type.
   * This is the user object you receive in the `jwt` and `session` callbacks.
   */
  interface User {
    // Add your custom 'role' property here.
    role: UserRole;
  }

  /**
   * Extends the built-in `Session` type.
   * This is the session object you get from `auth()` or `useSession()`.
   */
  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"]; // Merge with the default user properties (name, email, image)
  }
}

declare module "next-auth/jwt" {
  /**
   * Extends the built-in `JWT` type.
   * This is the shape of the token that is passed between the `jwt` and `session` callbacks.
   */
  interface JWT {
    role: UserRole;
  }
}
