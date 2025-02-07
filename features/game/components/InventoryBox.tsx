import { Command, CommandItem, CommandList } from "@/components/ui/command";
import { Inventory } from "@/features/game/types/inventory";
import { ComponentProps } from "react";

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
      <h3 className="text-bold text-5xl md:text-3xl sm:text-xl p-5 md:p-3 sm:p-1 self-center">
        Inventory
      </h3>
      <CommandList>
        {inventory.map((item, idx) =>
          item.show ? (
            <CommandItem key={idx} className="text-bold">
              {item.name}
            </CommandItem>
          ) : null
        )}
      </CommandList>
    </Command>
  );
}
