import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { creatingIssueSchema } from "../../validationSchema";

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const validation = creatingIssueSchema.safeParse(body);

  if (validation.error)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const issue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(issue, { status: 201 });
};
