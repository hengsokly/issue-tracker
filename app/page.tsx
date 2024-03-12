import Image from "next/image";
import Pagination from "./issues/_components/Pagination";
import { Button } from "@radix-ui/themes";
import { DoubleArrowLeftIcon } from "@radix-ui/react-icons";

export default function Home({searchParams}: {searchParams: {page: string}}) {
  return (
    <div>
      Hello Home page

      <Pagination itemCount={100} pageSize={10} currentPage={parseInt(searchParams.page)}/>
      
    </div>
  );
}
