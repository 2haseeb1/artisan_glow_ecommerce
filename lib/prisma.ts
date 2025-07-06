// lib/prisma.ts

import { PrismaClient } from "@prisma/client";

// This section is for TypeScript's benefit. It declares a global `prisma`
// variable on the NodeJS `global` object. This helps prevent type errors.
declare global {

  var prisma: PrismaClient | undefined;
}

/**
 * This is the core of the singleton pattern.
 *
 * In a development environment, Next.js's "Hot Reload" feature can create
 * multiple new instances of PrismaClient with every code change, quickly
 * exhausting your database connection pool.
 *
 * This code prevents that by storing the PrismaClient instance on the global
 * object the first time it's created. On subsequent reloads, it reuses the
 * existing instance from the global object instead of creating a new one.
 */
export const prisma =
  global.prisma ||
  new PrismaClient({
    // Optional: This will log all database queries to the console in development.
    // It's very useful for debugging.
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

// In a non-production environment, we assign the client to the global object.
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
