import { Issue } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import { default as Link, default as NextLink } from "next/link";
import { IssueStatusBadge } from "../components";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}

interface Props {
  // All search Params are string type, that's why page is pass with string
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
  return (
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
  );
};

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  {
    label: "Created At",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
