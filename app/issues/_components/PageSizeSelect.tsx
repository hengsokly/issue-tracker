"use client";

import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const PageSizeSelect = () => {
  const pageSize = "10";
  const pageSizeOptions = ["10", "15", "20", "100"];
  const router = useRouter();
  const searchParams = useSearchParams();

  const assignIssue = (size: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("pageSize", size);
    router.push("?" + params.toString());
  };

  return (
    <Select.Root defaultValue={pageSize} onValueChange={assignIssue}>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Page size</Select.Label>
          {pageSizeOptions.map((pageSize) => (
            <Select.Item key={pageSize} value={pageSize}>
              {pageSize}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default PageSizeSelect;
