import prisma from "@/prisma/client";
import { Avatar, Flex, Text } from "@radix-ui/themes";

const CommentList = async ({ issueId }: { issueId: number }) => {
  const comments = await prisma.comment.findMany({
    where: {
      issueId: issueId,
    },
    include: { user: true },
  });
  return (
    <Flex direction={"column"} gap={"2"}>
      {comments.map((comment) => (
        <Flex gap={"2"}>
          <Avatar
            fallback="?"
            src={comment.user.image!}
            size={"2"}
            radius="full"
          />

          <Flex direction={"column"} className="flex-grow" gap={"2"}>
            <Text>{comment.content}</Text>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

export default CommentList;
