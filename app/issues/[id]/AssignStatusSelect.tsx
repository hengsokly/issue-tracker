'use client';

import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AssignStatusSelect = ({issue}: {issue: Issue}) => {
  const statuses: { label: string; value: Status }[] = [
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" }
  ];

  const assignIssueStatus = (status: Status) => {
    axios.patch("/api/issues/" + issue.id, {
      status,
    }).catch((error) => {
      toast.error("Changes cannot be saved!");
    });
  }

  return (
    <>
      <Select.Root
        defaultValue={issue.status}
        onValueChange={assignIssueStatus}
      >
        <Select.Trigger placeholder="Assign status..." />
        <Select.Content>
          <Select.Group>
            {statuses.map((status) => (
              <Select.Item key={status.value} value={status.value}>
                {status.value}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>

      <Toaster />
    </>
  )
}

export default AssignStatusSelect
