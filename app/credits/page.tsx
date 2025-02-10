import { Button } from "@/components/ui/button";
import Link from "next/link";
import LicenseView from "../../features/licensing/components/LicenseView";

export default function Page() {
  return (
    <>
      <h1 className="text-xl md:text-3xl lg:text-6xl p-4 pl-0">Credits</h1>
      <h5 className="mb-2">
        This project uses the following open source libraries:
      </h5>
      <LicenseView className="h-fit max-h-4/5 mb-5 bg-transparent" />
      <Button asChild>
        <Link href="/">Home</Link>
      </Button>
    </>
  );
}
