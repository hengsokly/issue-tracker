import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueActions from "./IssueActions";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";
import Pagination from "./_components/Pagination";

const statuses = Object.values(Status);
interface Props {
  // All search Params are string type, that's why page is pass with string
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const orderBy = columnNames
    .map((column) => column)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;
  const issues = await prisma.issue.findMany({
    where: { status: status },
    orderBy: orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where: { status } });

  // this is for delay time to see loading page
  // Should remove it when shipping your code to production
  // await delay(2000);

  return (
    <Flex direction={"column"} gap={"3"}>
      <IssueActions></IssueActions>
      <IssueTable searchParams={searchParams} issues={issues}></IssueTable>
      <Pagination
        currentPage={page}
        itemCount={issueCount}
        pageSize={pageSize}
      />
    </Flex>
  );
};
// Tell next to render the route as dynamic, routes are rendered for each user at request time.
export const dynamic = "force-dynamic";

export default IssuesPage;

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};
