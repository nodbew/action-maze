import { Button } from "@/components/ui/button";
import CreditsPageLink from "@/features/informing/components/CreditsPageLink";
import InfoDialog from "@/features/informing/components/InfoDialog";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col h-full relative">
      <h1 className="self-start w-full mt-5 p-2 font-bold text-center text-9xl md:text-6xl sm:text-3xl">
        TITLE
      </h1>
      <div className="absolute top-1/2 left-0 w-full">
        <div className="relative">
          <div className="absolute w-1/3 left-1/3 top-0 flex justify-center align-center">
            <Button className="self-end w-1/2 h-10 mb-2 p-2" asChild>
              <Link href="/dungeon">Start</Link>
            </Button>
          </div>
          <div className="bg-primary w-1/3 h-0.5 absolute left-0 top-5" />
          <div className="bg-primary w-1/3 h-0.5 absolute right-0 top-5" />
        </div>
      </div>
      <div className="flex flex-row mb-4 mt-auto h-[12%]">
        <InfoDialog
          slotProps={{
            DialogTrigger: {
              className:
                "ml-40 sm:ml-10 mr-auto w-1/12 h-full bg-primary text-accent rounded-full",
            },
          }}
        />
        <CreditsPageLink className="mr-40 sm:mr-10 ml-auto w-1/12 h-full bg-primary text-accent rounded-full" />
      </div>
    </div>
  );
}
