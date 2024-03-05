'use client';

import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import React, { useState } from 'react'
import { TrashIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const DeleteIssueButton = ({issueId}: {issueId: number}) => {
  const router = useRouter();
  const [error, setError] = useState(false);

  const deleteIssue = async() => {
    try {
      // throw new Error();
      await axios.delete('/api/issues/' + issueId);
      router.push('/issues');
      router.refresh();  
    } catch (error) {
      setError(true);
    }
  }
  
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red"><TrashIcon /> Delete Issue</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>Confirm delete</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure you want to delete this issue? This action cannot be undone.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red" onClick={deleteIssue}>
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>This issue could not be deleted</AlertDialog.Description>
          <AlertDialog.Cancel >
            <Button variant="soft" color="gray" onClick={() => setError(false)}>
              OK
            </Button>
          </AlertDialog.Cancel>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}

export default DeleteIssueButton
