"use client";

import { Spinner } from "@/app/components";
import { commentSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { Avatar, Button, Flex, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type CommentFormData = z.infer<typeof commentSchema>;

const CommentInput = ({ user, issueId }: { user: User; issueId: number }) => {
  const [showButton, setShowButton] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<CommentFormData> = async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/issues/" + issueId + "/comments", data);
      reset();
      setSubmitting(false);
      setShowButton(false);

      // Tell nextjs to refresh route from caching
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      console.log(error);
      setError("An unexpect error occure!");
    }
  };

  return (
    <form className=" space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <Flex gap={"2"}>
        <Avatar fallback="?" src={user.image!} size={"2"} radius="full" />

        <Flex direction={"column"} className="flex-grow" gap={"2"}>
          <TextField.Input
            variant="soft"
            placeholder="Add a comment... join the conversation"
            onFocus={() => setShowButton(true)}
            {...register("content")}
          />

          {showButton && (
            <Flex gap={"2"}>
              <Button disabled={isSubmitting}>
                Comment
                {isSubmitting && <Spinner></Spinner>}
              </Button>

              <Button
                className="soft"
                color="gray"
                variant="soft"
                onClick={() => setShowButton(false)}
              >
                Cancel
              </Button>
            </Flex>
          )}
        </Flex>
      </Flex>
    </form>
  );
};

export default CommentInput;
