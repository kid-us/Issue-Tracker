import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const creatingIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(10),
});

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
