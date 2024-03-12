"use client";

import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useQuery } from "react-query";

const unassigned = "unassigned"

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, //60 seconds
    retry: 3,
  });

  if (isLoading) return <Skeleton />;

  if (error) return null;

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const {data} = await axios.get<User[]>('/api/users');
  //     setUsers(data);
  //   }

  //   fetchUser();
  // }, [])

  console.log('-----------------,', issue.assignedToUserId)

  return (
    <Select.Root
      defaultValue={issue.assignedToUserId || unassigned}
      onValueChange={(userId) => {
        let assignedToUserId = userId === unassigned ? null : userId;
        
        axios.patch("/api/issues/" + issue.id, {
          assignedToUserId
        });
      }}
    >
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value={unassigned}>Unassigned</Select.Item>
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

export default AssigneeSelect;
