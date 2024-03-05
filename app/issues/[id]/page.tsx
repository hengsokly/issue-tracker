import authOptions from '@/app/api/auth/[...nextauth]/authOptions';
import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import DeleteIssueButton from './DeleteIssueButton';
import EditIssueButton from './EditIssueButton';
import IssueDetail from './IssueDetail';

interface Props {
  params: {
    id: string
  }
}

const IssueDetailPage = async({params}: Props) => {
  // if(typeof params.id !== 'number') notFound();
  const session = await getServerSession(authOptions);
  
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }
  })

  if(!issue) notFound();

  return (
    <Grid columns={{initial: '1', sm: '5'}} gap={'5'}>
      <Box className='md:col-span-4'>
        <IssueDetail issue={issue}></IssueDetail>
      </Box>

      { session &&
        <Box>
          <Flex direction={'column'} gap={'5'}>
            <EditIssueButton issueId={issue.id}></EditIssueButton>
            <DeleteIssueButton issueId={issue.id}></DeleteIssueButton>
          </Flex>
        </Box>  
      }
      
    </Grid>
  )
}

export default IssueDetailPage
