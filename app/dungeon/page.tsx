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
  const [inventory, setInventory] = useState<Inventory>([]);

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
      <ResetButton className="fixed left-5 top-5 p-5 sm:p-3" />
      <InventoryBox
        className="fixed right-10 top-20 w-2/12 h-2/3 border-primary border-2 rounded-md bg-transparent"
        inventory={inventory}
      />

      <h1 className="text-center self-center w-2/3 mt-10 sm:mt-5 p-2 text-5xl sm:text-2xl whitespace-pre-wrap">
        {description}
      </h1>
      <Actions
        className="mb-10 sm:mb-3 mt-auto w-2/3 h-fit min-h-1/10 self-center border-primary border-2 rounded-md"
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
