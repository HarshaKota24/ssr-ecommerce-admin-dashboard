import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import { connectDB } from "@/lib/db";
import Admin from "@/models/admin";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        await connectDB();

        const admin = await Admin.findOne({
          email: credentials?.email,
        });

        if (!admin) return null;

        const ok = await bcrypt.compare(
          credentials!.password,
          admin.password
        );

        if (!ok) return null;

        return {
          id: admin._id.toString(),
          email: admin.email,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
