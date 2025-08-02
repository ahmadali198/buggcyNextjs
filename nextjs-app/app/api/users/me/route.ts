// app/api/users/me/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { name, age, gender, profileImageUrl } = body;

  try {
    const updated = await prisma.user.update({
      where: { email: session.user.email },
      data: { name, age: Number(age), gender, profileImageUrl },
    });

    return NextResponse.json({ message: 'Profile updated', user: updated });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Update failed' }, { status: 500 });
  }
}
