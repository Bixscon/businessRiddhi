'use server';

import prisma from '@/lib/db';
import { signUpSchema } from '@/schemas';
import * as z from 'zod';
import { hash } from 'bcryptjs';
import { signin } from './signin';

export const register = async (values: z.infer<typeof signUpSchema>) => {
  console.log('Registering user with values:', values);
  const validatedFields = signUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { identifier, password, type, name } = validatedFields.data;

  const isEmail = /\S+@\S+\.\S+/.test(identifier);
  const isPhoneNumber = /^\d{10}$/.test(identifier);

  if (!isEmail && !isPhoneNumber) {
    return { error: 'Invalid email or phone number!' };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: isEmail ? { email: identifier } : { phoneNumber: identifier },
    });

    console.log(existingUser);

    if (existingUser) {
      return { error: 'User already exists!' };
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email: isEmail ? identifier : undefined,
        phoneNumber: isPhoneNumber ? identifier : undefined,
        name,
        password: hashedPassword,
        type,
      },
    });

    await signin({ identifier, password });

    return { success: 'User created successfully!', userId: user.id };
  } catch (err) {
    console.log(err);
    return { error: 'Something went wrong' };
  }
};
