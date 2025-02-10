import { Command, CommandItem, CommandList } from "@/components/ui/command";
import type { Inventory } from "@/features/game/types/inventory";
import { ComponentProps, Dispatch, SetStateAction } from "react";
import type { Action, SituationHistory } from "../types/situation";

export default function Actions(
  props: Omit<
    ComponentProps<typeof Command> & {
      actions: Array<Action>;
      variables: {
        inventory: Inventory;
        setInventory: Dispatch<SetStateAction<Inventory>>;
        situationHistory: SituationHistory;
        setSituationHistory: Dispatch<SetStateAction<SituationHistory>>;
      };
    },
    "label"
  >
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
    <Command {...others} data-testid="Actions">
      <CommandList className="max-h-none w-full overflow-auto">
        {actions.map(({ component }, idx) => (
          <CommandItem key={idx} className="text-xl md:text-3xl lg:text-5xl">
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
