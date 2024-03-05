import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import { TrashIcon } from '@radix-ui/react-icons';

const DeleteIssueButton = ({issueId}: {issueId: number}) => {
  return (
    <Button color='red'>
      <TrashIcon />
      <Link href={`/issues/${issueId}/edit`}>Delete Issue</Link>
    </Button>
  )
}

export default DeleteIssueButton
