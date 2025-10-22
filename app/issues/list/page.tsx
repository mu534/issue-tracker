// ...existing code...
import React from "react";
import { Table } from "@radix-ui/themes";
import { IssueStatusBade, Link } from "@/app/components";
import NextLink from "next/link";
import IssueActions from "./IssueActions";

import prisma from "@/lib/prisma";

import delay from "delay";
import { Issue, Status } from "@/app/generated/prisma";
import { ArrowUpIcon, ColumnsIcon } from "@radix-ui/react-icons";
import Pagination from "@/app/components/Pagination";

const IssuesPage = async ({
  searchParams,
}: {
  // relaxed to allow optional/strings coming from URL
  searchParams: { status?: string; orderBy?: string; page?: string };
}) => {
  const column: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  const statuses = Object.values(Status) as string[];
  const status =
    searchParams?.status && statuses.includes(searchParams.status)
      ? (searchParams.status as Status)
      : undefined;

  const where = status ? { status } : undefined;

  const orderBy =
    searchParams?.orderBy &&
    column.map((c) => c.value).includes(searchParams.orderBy as keyof Issue)
      ? ({ [searchParams.orderBy as keyof Issue]: "asc" } as Record<
          keyof Issue,
          "asc"
        >)
      : undefined;

  const page = parseInt(searchParams?.page ?? "1", 10) || 1;
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
    <div>
      <IssueActions />

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {column.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{
                    query: { ...searchParams, orderBy: column.value },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>

                <div className="block md:hidden">
                  <IssueStatusBade status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBade status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  );
};
export const dynamic = "force-dynamic";

export default IssuesPage;
