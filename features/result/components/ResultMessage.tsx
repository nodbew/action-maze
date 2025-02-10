import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ResultMessage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col align-center h-full">
      <h1 className="font-bold p-5 text-center text-2xl md:text-4xl lg:text-6xl">
        {title}
      </h1>
      <p className="font-medium text-center text-lg md:text-xl lg:text-3xl whitespace-pre-line p-2">
        {description}
      </p>
      <Button className="mb-5 md:mb-10 mt-auto w-1/3 self-center" asChild>
        <Link href="/">Reset</Link>
      </Button>
    </div>
  );
}
