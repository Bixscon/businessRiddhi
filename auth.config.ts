import type { NextAuthConfig } from 'next-auth';
import prisma from './lib/db';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { loginSchema } from './schemas';
import { compare } from 'bcryptjs';

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { identifier, password } = validatedFields.data;

        const isEmail = /\S+@\S+\.\S+/.test(identifier);
        const isPhoneNumber = /^\d{10}$/.test(identifier);

        if (!isEmail && !isPhoneNumber) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: isEmail ? { email: identifier } : { phoneNumber: identifier },
        });

        if (!user || !user.password) {
          return null;
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
          return null;
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
