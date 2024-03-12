import { IssueStatusBadge, Link } from "@/app/components";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import IssueActions from "./IssueActions";
import Pagination from "./_components/Pagination";

const statuses = Object.values(Status);
const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created At", value: "createdAt", className: "hidden md:table-cell" },
];

interface Props {
  // All search Params are string type, that's why page is pass with string
  searchParams: { 
    status: Status; 
    orderBy: keyof Issue;
    page: string;
  }
}

const IssuesPage = async ({searchParams}: Props) => {
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const orderBy = columns.map(column => column.value).includes(searchParams.orderBy) ? {[searchParams.orderBy]: 'asc'} : undefined;
  const issues = await prisma.issue.findMany({
    where: { status: status },
    orderBy: orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
  });

  const issueCount = await prisma.issue.count({where: {status}})

  // this is for delay time to see loading page
  // Should remove it when shipping your code to production
  // await delay(2000);

  return (
    <div>
      <IssueActions></IssueActions>

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
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
                  {searchParams.orderBy == column.value && (
                    <ArrowUpIcon className="inline" />
                  )}
                </NextLink>
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
                  <IssueStatusBadge status={issue.status}></IssueStatusBadge>
                </div>
              </Table.Cell>

              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status}></IssueStatusBadge>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Pagination currentPage={page} itemCount={issueCount} pageSize={pageSize}/>
    </div>
  );
};
// Tell next to render the route as dynamic
export const dynamic = "force-dynamic";

export default IssuesPage;
