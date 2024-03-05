'use client';

import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import { TrashIcon } from '@radix-ui/react-icons';

const DeleteIssueButton = ({issueId}: {issueId: number}) => {
  return (
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
            <Button variant="solid" color="red">
              Delete Issue
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export default DeleteIssueButton
