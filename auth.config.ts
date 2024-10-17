import type { NextAuthConfig } from 'next-auth';
import prisma from './lib/db';
import Credentials from 'next-auth/providers/credentials';
import { loginSchema } from './schemas';
import { compare } from 'bcryptjs';

export default {
  providers: [
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

        console.log(user);

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
