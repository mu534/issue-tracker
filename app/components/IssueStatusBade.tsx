import React from "react";
import { Status } from "../generated/prisma/client";
import { Badge } from "@radix-ui/themes/components/badge";
const statusMap: Record<
  Status,
  { label: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};
const IssueStatusBade = ({ status }: { status: Status }) => {
  return (
    <Badge color={statusMap[status].color}> {statusMap[status].label}</Badge>
  );
};

export default IssueStatusBade;
