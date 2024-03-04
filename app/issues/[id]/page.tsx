import prisma from '@/prisma/client';
import { Box, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetail from './IssueDetail';

interface Props {
  params: {
    id: string
  }
}

const IssueDetailPage = async({params}: Props) => {
  // if(typeof params.id !== 'number') notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }
  })

  if(!issue) notFound();

  return (
    <Grid columns={{initial: '1', md: '2'}} gap={'5'}>
      <Box>
        <IssueDetail issue={issue}></IssueDetail>
      </Box>

      <Box>
        <EditIssueButton issueId={issue.id}></EditIssueButton>
      </Box>
    </Grid>
  )
}

export default IssueDetailPage
