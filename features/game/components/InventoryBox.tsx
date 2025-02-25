import { Command, CommandItem, CommandList } from "@/components/ui/command";
import { Inventory } from "@/features/game/types/inventory";
import { ComponentProps } from "react";
import { ITEMS } from "../data";

export default function InventoryBox(
  props: Omit<
    ComponentProps<typeof Command> & { inventory: Inventory },
    "label"
  >
) {
  const { inventory, ...others } = props;
  others.className = `flex flex-col ${others.className}`;
  return (
    <Command {...others} data-testid="Inventory">
      <h3 className="md:text-bold text-md md:text-xl lg:text-3xl p-5 sm:p-1 self-center overflow-auto">
        Inventory
      </h3>
      <CommandList className="overflow-auto">
        {Object.keys(inventory).map((item, idx) =>
          ITEMS[item as keyof typeof inventory].show ? (
            <CommandItem key={idx} className="text-base md:text-lg lg:text-2xl">
              {item}: {inventory[item as keyof typeof inventory]}
            </CommandItem>
          ) : null
        )}
      </CommandList>
    </Command>
  );
}
