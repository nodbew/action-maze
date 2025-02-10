"use client";

import Actions from "@/features/game/components/Actions";
import InventoryBox from "@/features/game/components/InventoryBox";
import ResetButton from "@/features/game/components/ResetButton";
import { SITUATIONS } from "@/features/game/data";
import type { Inventory } from "@/features/game/types/inventory";
import type { SituationHistory } from "@/features/game/types/situation";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Page() {
  // States to manage the situation to show
  const [situationHistory, setSituationHistory] = useState<SituationHistory>([
    "Start",
  ]);
  const [inventory, setInventory] = useState<Inventory>({});

  // Get current state
  // situationHistory won't be truncated, and it has an initial value at 0. Therefore the value is not nullable
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const mostRecentSituationName = situationHistory.at(-1)!;
  let description, possibleActions;
  if (mostRecentSituationName in SITUATIONS) {
    const situation = SITUATIONS[mostRecentSituationName];
    description = situation.description;
    possibleActions = situation.possibleActions;
  } else {
    redirect(
      `/result/error/${encodeURIComponent(
        "Internal Error : Failed to parse history"
      )}`
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ResetButton className="fixed left-5 top-5 p-3 md:p-4 lg:p-5" />
      <InventoryBox
        className="fixed right-5 md:right-10 top-10 md:top-20 w-2/12 h-2/3 border-primary border-2 rounded-md bg-transparent"
        inventory={inventory}
      />

      <h1 className="text-center self-center w-2/3 mt-5 md:mt-10 p-2 text-md md:text-3xl lg:text-5xl whitespace-pre-wrap">
        {description}
      </h1>
      <Actions
        className="mb-3 md:mb-6 lg:mb-10 mt-auto w-2/3 h-fit min-h-1/10 self-center border-primary border-2 rounded-md"
        actions={possibleActions}
        variables={{
          inventory,
          setInventory,
          situationHistory,
          setSituationHistory,
        }}
      />
    </div>
  );
}
