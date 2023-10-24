import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

interface Props {
  params: {
    id: string;
  };
}
interface User {
  name: string;
  email: string;
}
export const GET = async (request: NextRequest, { params: { id } }: Props) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  if (!user)
    return NextResponse.json({ error: "The user not found!" }, { status: 404 });
  return NextResponse.json(user);
};

export const PUT = async (request: NextRequest, { params: { id } }: Props) => {
  const body: User = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  if (!user)
    return NextResponse.json({ error: "User not found!" }, { status: 404 });
  const updatedUser = await prisma.user.update({
    where: { id: id },
    data: { name: body.name, email: body.email },
  });

  return NextResponse.json(updatedUser, { status: 201 });
};

export const DELETE = async (
  request: NextRequest,
  { params: { id } }: Props
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  if (!user)
    return NextResponse.json({ error: "User not found!" }, { status: 404 });

  const deletedUser = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  return NextResponse.json({
    user: deletedUser,
    message: "User has been deleted successfully!",
  });
};
