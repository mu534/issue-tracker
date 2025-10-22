// ...existing code...
import React from "react";
import { Flex, Table } from "@radix-ui/themes";
import { IssueStatusBade, Link } from "@/app/components";

import IssueActions from "./IssueActions";

import prisma from "@/lib/prisma";

import delay from "delay";
import { Status } from "@/app/generated/prisma";

import Pagination from "@/app/components/Pagination";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status) as string[];
  const status =
    searchParams?.status && statuses.includes(searchParams.status)
      ? (searchParams.status as Status)
      : undefined;

  const where = status ? { status } : undefined;

  const orderByKey =
    searchParams.orderBy &&
    columnNames.includes(searchParams.orderBy as (typeof columnNames)[number])
      ? (searchParams.orderBy as (typeof columnNames)[number])
      : undefined;

  const orderBy = orderByKey ? { [orderByKey]: "asc" } : undefined;

  const page = searchParams.page ? parseInt(searchParams.page, 10) || 1 : 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  const issueCount = await prisma.issue.count({ where });
  await delay(2000);
  return (
    <Flex direction="column" gap="4">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />

      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
};
export const dynamic = "force-dynamic";

export default IssuesPage;
