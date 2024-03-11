'use client';

import { Skeleton } from '@/app/components';
import { User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import axios from 'axios';
import { useQuery } from 'react-query';

const AssigneeSelect = () => {
  const { data: users, error, isLoading } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get<User[]>('/api/users').then(res => res.data),
    staleTime: 60 * 1000, //60 seconds
    retry: 3
  })

  if (isLoading) return <Skeleton />

  if (error) return null;

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const {data} = await axios.get<User[]>('/api/users');
  //     setUsers(data);
  //   }

  //   fetchUser();
  // }, [])

  return (
    <Select.Root>
      <Select.Trigger placeholder='Assign...' />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users?.map(user => <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>)}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}

export default AssigneeSelect
