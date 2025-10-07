import IssueStatusBade from "@/app/components/IssueStatusBade";
import prisma from "@/lib/prisma";
import { Card, Flex, Heading } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes/components/callout";
import { notFound } from "next/navigation";

import ReactMarkdown from "react-markdown";
interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex className="gap-3" my="2">
        <IssueStatusBade status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
