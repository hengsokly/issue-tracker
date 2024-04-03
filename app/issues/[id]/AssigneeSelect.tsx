"use client";

import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "react-query";

const unassigned = "unassigned";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton />;

  if (error) return null;

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const {data} = await axios.get<User[]>('/api/users');
  //     setUsers(data);
  //   }

  //   fetchUser();
  // }, [])

  const router = useRouter();

  const assignIssue = async(userId: string) => {
    let assignedToUserId = userId === unassigned ? null : userId;

    await axios.patch("/api/issues/" + issue.id, {
      assignedToUserId,
    }).catch((error) => {
      toast.error("Changes cannot be saved!");
    });

    router.refresh();
  }

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || unassigned}
        onValueChange={assignIssue}
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

      <Toaster />
    </>
  );
};

const useUsers = () => useQuery<User[]>({
  queryKey: ["users"],
  queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
  staleTime: 60 * 1000, //60 seconds
  retry: 3,
})

export default AssigneeSelect;
