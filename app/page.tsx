import prisma from "@/lib/prisma";
import IssueSummery from "./IssueSummery";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  return <IssueSummery open={open} inProgress={inProgress} closed={closed} />;
}
