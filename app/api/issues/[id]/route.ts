import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validatation = issueSchema.safeParse(body);
  if (!validatation.success)
    return NextResponse.json(validatation.error.format(), { status: 400 });
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue)
    return NextResponse.json({ error: "Ivalid issue" }, { status: 404 });
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(updatedIssue);
}
