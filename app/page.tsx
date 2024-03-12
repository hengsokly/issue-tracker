import Image from "next/image";
import Pagination from "./issues/_components/Pagination";
import { Button } from "@radix-ui/themes";
import { DoubleArrowLeftIcon } from "@radix-ui/react-icons";
import LatestIssues from "./LatestIssues";

export default function Home({searchParams}: {searchParams: {page: string}}) {
  return (
    <div>
      <LatestIssues />      
    </div>
  );
}
