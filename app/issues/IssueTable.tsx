import { Issue } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import { IssueStatusBadge } from "../components";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
  sortDirection: string;
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
          {columns.map((column) => {
            const sortDirection =
              searchParams.orderBy == column.value &&
              searchParams.sortDirection == "desc"
                ? "asc"
                : "desc";
            const sortDirectionIcon =
              searchParams.orderBy == column.value &&
              (searchParams.sortDirection == "desc" ? (
                <ArrowDownIcon className="inline" />
              ) : (
                <ArrowUpIcon className="inline" />
              ));

            return (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <Link
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: column.value,
                      sortDirection: sortDirection,
                    },
                  }}
                >
                  {column.label}
                  {sortDirectionIcon}
                </Link>
              </Table.ColumnHeaderCell>
            );
          })}
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
