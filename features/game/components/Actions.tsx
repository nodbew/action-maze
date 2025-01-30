import type { Inventory } from "@/features/game/types/inventory";
import type { Action, SituationHistory } from "../types/situation";
import { Command, CommandItem, CommandList } from "@/components/ui/command";
import { ComponentProps, Dispatch, SetStateAction } from "react";

export default function Actions(
  props: ComponentProps<typeof Command> & {
    actions: Array<Action>;
    variables: {
      inventory: Inventory;
      setInventory: Dispatch<SetStateAction<Inventory>>;
      situationHistory: SituationHistory;
      setSituationHistory: Dispatch<SetStateAction<SituationHistory>>;
    };
  }
) {
  const {
    actions,
    variables: {
      inventory,
      setInventory,
      situationHistory,
      setSituationHistory,
    },
    ...others
  } = props;
  return (
    <Command {...others}>
      <CommandList className="max-h-none w-full">
        {actions.map(({ component }, idx) => (
          <CommandItem key={idx} className="text-2xl">
            {component({
              inventory,
              setInventory,
              situationHistory,
              setSituationHistory,
            })}
          </CommandItem>
        ))}
      </CommandList>
    </Command>
  );
}
