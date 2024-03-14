"use client";

import { User } from "@prisma/client";
import { Avatar, Button, Flex, TextField } from "@radix-ui/themes";
import { useState } from "react";

const CommentInput = ({ user }: { user: User }) => {
  const [showButton, setShowButton] = useState(false);

  return (
    <Flex gap={"2"}>
      <Avatar fallback="?" src={user.image!} size={"2"} radius="full" />

      <Flex direction={"column"} className="flex-grow" gap={"2"}>
        <TextField.Input
          variant="soft"
          placeholder="Add a comment... join the conversation"
          onFocus={() => setShowButton(true)}
        />

        { showButton && (
          <Flex gap={"2"}>
            <Button>Comment</Button>
            <Button className="soft" color="gray" variant="soft" onClick={() => setShowButton(false)}>
              Cancel
            </Button>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default CommentInput;
