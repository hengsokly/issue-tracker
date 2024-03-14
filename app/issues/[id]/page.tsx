import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import AssigneeSelect from "./AssigneeSelect";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetail from "./IssueDetail";
import { cache } from "react";
import AssignStatusSelect from "./AssignStatusSelect";
import CommentInput from "./CommentInput";
import { comment } from "postcss";
import CommentList from "./CommentList";

interface Props {
  params: {
    id: string;
  };
}

// Use cached function to query one from database and return later from cache.
// Here we have 2 times for fetching issue, that's why we use cache to improve the performent.
const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailPage = async ({ params }: Props) => {
  // if(typeof params.id !== 'number') notFound();
  const session = await getServerSession(authOptions);

  const issue = await fetchIssue(parseInt(params.id));
  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap={"5"}>
      <Box className="md:col-span-4">
        <IssueDetail issue={issue}></IssueDetail>
      </Box>

      {session && (
        <>
          <Box>
            <Flex direction={"column"} gap={"5"}>
              <AssigneeSelect issue={issue} />
              <AssignStatusSelect issue={issue} />
              <EditIssueButton issueId={issue.id}></EditIssueButton>
              <DeleteIssueButton issueId={issue.id}></DeleteIssueButton>
            </Flex>
          </Box>

          <Box className="md:col-span-4">
            <Flex gap={'2'} direction={'column'}>
              <CommentList issueId={issue.id}/>
              <CommentInput user={session.user} issueId={issue.id} />
            </Flex>
          </Box>
        </>
      )}
    </Grid>
  );
};

// Be careful with the function name spelling
// It is for support SEO and rendering dynmaic for each issue detail
export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssue(parseInt(params.id));

  return {
    title: issue?.title,
    description: "Detail of issue " + issue?.id,
  };
}

export default IssueDetailPage;
