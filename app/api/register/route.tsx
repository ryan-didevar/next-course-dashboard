import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
interface RegisterInfo {
  email: string;
  password: string;
}
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});
export const POST = async (request: NextRequest) => {
  const body: RegisterInfo = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });
  if (user)
    return NextResponse.json(
      { error: "User already exists!" },
      { status: 400 }
    );
  const hashedPassword = await bcrypt.hash(body.password, 10);
  const newUser = await prisma.user.create({
    data: {
      email: body.email,
      hashedPassword,
    },
  });
  return NextResponse.json({ email: newUser.email });
};
