"use client";

import dynamic from "next/dynamic";
import IssueFormSkeleton from "./IssueFormSkeleton";
import { Issue } from "@/app/generated/prisma";
interface IssueFormWrapperProps {
  issue: Issue;
}

const IssueForm = dynamic(() => import("./IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

export default function IssueFormWrapper(props: IssueFormWrapperProps) {
  return <IssueForm {...props} />;
}
