import ResultMessage from "@/features/result/components/ResultMessage";
import Confetti from "../../../../features/result/components/Confetti";

export default async function Page({
  params,
}: {
  params: Promise<{ message: string }>;
}) {
  const description = decodeURIComponent((await params).message);
  return (
    <>
      <ResultMessage title="You made it!" description={description} />
      <Confetti />
    </>
  );
}
