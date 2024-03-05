import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetail from './IssueDetail';
import DeleteIssueButton from './DeleteIssueButton';

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
    <Grid columns={{initial: '1', sm: '5'}} gap={'5'}>
      <Box className='md:col-span-4'>
        <IssueDetail issue={issue}></IssueDetail>
      </Box>

      <Box>
        <Flex direction={'column'} gap={'5'}>
          <EditIssueButton issueId={issue.id}></EditIssueButton>
          <DeleteIssueButton issueId={issue.id}></DeleteIssueButton>
        </Flex>
      </Box>
    </Grid>
  )
}

export default IssueDetailPage
