import { ItemNames } from "../data";

export interface Item {
  show: boolean;
  stackable: boolean;
}
export type Inventory = {
  [P in ItemNames]?: number
};
