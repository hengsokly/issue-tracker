"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import PageSizeSelect from "./PageSizeSelect";
interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const pageCount = Math.ceil(itemCount / pageSize);
  const router = useRouter();
  const searchParams = useSearchParams();

  if (pageCount < 2) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  return (
    <Flex align={"center"} gap={"2"}>
      <Text>
        Page {currentPage} of {pageCount}
      </Text>

      <Button
        color="gray"
        variant="soft"
        disabled={currentPage == 1}
        onClick={() => changePage(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>

      <Button
        color="gray"
        variant="soft"
        disabled={currentPage == 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        color="gray"
        variant="soft"
        disabled={currentPage == pageCount}
        onClick={() => changePage(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>

      <Button
        color="gray"
        variant="soft"
        disabled={currentPage == pageCount}
        onClick={() => changePage(pageCount)}
      >
        <DoubleArrowRightIcon />
      </Button>

      <PageSizeSelect />
    </Flex>
  );
};

export default Pagination;
