import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      if (isOnDashboard && !isLoggedIn) {
        return false; // Will trigger redirect in middleware
      }

      return true;
    },
  },
  providers: [], // Add your credentials or GitHub/Google providers here
} satisfies NextAuthConfig;

// ✅ Export the middleware-compatible function
export const auth = NextAuth(authConfig);
