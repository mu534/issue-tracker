"use client";

import AssigneeSelectOriginal from "./AssigneeSelect";
import { Issue } from "@/app/generated/prisma";

interface Props {
  issue: Issue;
}

const AssigneeSelectWrapper = ({ issue }: Props) => {
  return <AssigneeSelectOriginal issue={issue} />;
};

export default AssigneeSelectWrapper;
