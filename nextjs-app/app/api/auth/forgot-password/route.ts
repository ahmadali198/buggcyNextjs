import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { sendResetEmail } from '@/lib/mailer';
import crypto from 'crypto';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  const token = crypto.randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 3600 * 1000); // 1 hour

  await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  await sendResetEmail(email, token);
  return NextResponse.json({ message: 'Reset email sent' });
}
