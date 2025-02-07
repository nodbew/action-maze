import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ComponentProps } from "react";

export default function InfoDialog(props: {
  slotProps?: {
    Dialog?: ComponentProps<typeof Dialog>;
    DialogTrigger?: ComponentProps<typeof DialogTrigger>;
    DialogContent?: ComponentProps<typeof DialogContent>;
  };
}) {
  return (
    <Dialog {...props.slotProps?.Dialog}>
      <DialogTrigger {...props.slotProps?.DialogTrigger}>info</DialogTrigger>
      <DialogContent {...props.slotProps?.DialogContent}>
        <DialogHeader>
          <DialogTitle className="text-center text-3xl border-b-2 border-primary pb-1 mb-3">
            Story
          </DialogTitle>
          <DialogDescription className="whitespace-pre-line text-primary text-lg">
            {`One morning, you woke up in a dungeon...
              A single wrong decision will trap you in forever.
              Choose the right actions to escape!
              
              Note:
              Items in your inventory might help...`}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
