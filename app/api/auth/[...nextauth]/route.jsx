import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/lib/mongoClient'; // MongoDB connection

// Define auth options only once
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt', // Use JWT for session management
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub; // Attach user ID from token
      return session;
    },
  },
  dynamic: 'force-dynamic', // Disable caching for fresh render
};

// Initialize NextAuth with the authOptions
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
