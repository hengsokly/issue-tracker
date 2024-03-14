"use client";

import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "react-query";
import { Skeleton } from "../components";

const IssueAssigneeFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton width={"10rem"} />;
  if (error) return null;

  const filterIssues = (userId: string) => {
    const params = new URLSearchParams(searchParams);

    if (userId && userId != "ALL") params.set("assignedToUserId", userId);
    else params.delete("assignedToUserId");

    router.push("/issues?" + params.toString());
  };

  return (
    <Select.Root
      defaultValue={
        searchParams.get("status") && searchParams.get("status") != "ALL"
          ? searchParams.get("status")!
          : ""
      }
      onValueChange={filterIssues}
    >
      <Select.Trigger placeholder="Filter by assignee..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Filter by assignee...</Select.Label>
          <Select.Item value={"ALL"}>All</Select.Item>

          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, //60 seconds
    retry: 3,
  });

export default IssueAssigneeFilter;
