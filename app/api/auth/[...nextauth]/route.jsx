import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/lib/mongoClient';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/userSchema';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;

      await connectDB();
      const dbUser = await User.findOne({ email: session.user.email });
      if (dbUser) {
        session.user.isProfileComplete = dbUser.isProfileComplete;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
