"use-client";

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

import IssueFormWrapper from "../../_components/IssueFormWrapper";

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });
  if (!issue) notFound();
  return <IssueFormWrapper issue={issue} />;
};

export default EditIssuePage;
