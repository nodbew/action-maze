import { Dispatch, ReactNode, SetStateAction } from "react";
import { SituationNames } from "../data";
import { Inventory } from "./inventory";

type UnremoveableArray<T extends Array<unknown>> = Pick<
  T,
  Exclude<keyof T, "splice" | "pop" | "shift" | "unshift">
>;
export type SituationHistory = UnremoveableArray<Array<SituationNames>>;
export type Action = {
  description: string;
  component: (props: {
    inventory: Inventory;
    setInventory: Dispatch<SetStateAction<Inventory>>;
    situationHistory: SituationHistory;
    setSituationHistory: Dispatch<SetStateAction<SituationHistory>>;
  }) => ReactNode;
};
export interface Situation {
  description: string;
  possibleActions: Array<Action>;
}
