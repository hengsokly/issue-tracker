import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import { commentSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const user = await prisma.user.findUnique({
    where: {email: session.user?.email!}
  })

  const body = await request.json();
  const validation = commentSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newComment = await prisma.comment.create({
    data: {
      content: body.content,
      userId: user.id,
      issueId: parseInt(params.id),
    },
  });

  return NextResponse.json(newComment, { status: 201 });
}
