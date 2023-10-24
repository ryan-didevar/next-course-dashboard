import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";

interface User {
  name: string;
  email: string;
}
export const GET = async (request: NextRequest) => {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
};
export const POST = async (request: NextRequest) => {
  const body: User = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  if (user) return NextResponse.json("User already exists.", { status: 400 });
  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
    },
  });
  return NextResponse.json(newUser, { status: 201 });
};
