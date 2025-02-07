import { Command, CommandItem, CommandList } from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ComponentProps } from "react";
import { LICENSES } from "../data";

export default function LicenseView(props: ComponentProps<typeof Command>) {
  return (
    <Command {...props}>
      <CommandList className="overflow-auto max-h-none">
        {Object.entries(LICENSES)
          .toSorted(([n1, _], [n2, __]) => n1.localeCompare(n2))
          .map(([name, childNode]) => (
            <Dialog key={name}>
              <DialogTrigger className="flex flex-col">
                <CommandItem>{name}</CommandItem>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>{name}</DialogTitle>
                {childNode}
              </DialogContent>
            </Dialog>
          ))}
      </CommandList>
    </Command>
  );
}
