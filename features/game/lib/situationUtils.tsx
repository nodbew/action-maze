import { Button } from "@/components/ui/button";
import { ComponentProps } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ItemNames, ITEMS, SituationNames } from "../data";
import type { Action, Situation } from "../types/situation";
import { Inventory } from "../types/inventory";

export const NAVIGATION_TARGET = {
  SUCCESS: Symbol("Success"),
  FAILURE: Symbol("Failure"),
} as const satisfies Record<string, symbol>;

const GhostButton = (props: ComponentProps<typeof Button>) => <Button variant="ghost" className="hover:bg-transparent text-3xl p-0" {...props} />;

/* Utility function for creating situation objects */
export function createSituation(
  description: string,
  options: Array<
    { description: string } & (
      | {
        type: "next";
        navigate: SituationNames | number;
        requiredItems?: Inventory;
        addItems?: Array<ItemNames>;
      }
      | {
        type: "end";
        navigate: (typeof NAVIGATION_TARGET)[keyof typeof NAVIGATION_TARGET];
        message: string;
        requiredItems?: Inventory;
      }
      | {
        type: "raw";
        component: NonNullable<Action["component"]>;
      }
    )
  >
): Situation {
  const possibleActions: Situation["possibleActions"] = options.map(option => {
    switch (option.type) {
      // Automatically generate a button component
      case "next": {
        const component: Action["component"] = ({
          inventory,
          setInventory,
          situationHistory,
          setSituationHistory,
        }) => {
          const { description, navigate, requiredItems = {}, addItems } = option;
          // Check if there are necessary items for selecting the option
          const disabled = !(
            Object.keys(requiredItems).every((itemName) => {
              const name = itemName as keyof typeof requiredItems;
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              inventory[name] ?? -1 > requiredItems[name]! // Object.keys(obj) will not return a property that is not in the obj
            })
          );
          // Callback to call when the option is selected
          const handleClick = () => {
            // Add items to inventory
            setInventory(p => {
              const prev = { ...p };
              addItems?.forEach(name => {
                if (prev[name] == undefined) {
                  prev[name] = 1;
                } else {
                  if ((ITEMS[name].stackable === true) || (ITEMS[name].stackable === false && prev[name] === 0)) {
                    prev[name] += 1;
                  }
                }
              });
              return prev;
            })
            // Redirect to the next situation
            if (typeof navigate === "number") {
              if (situationHistory.at(navigate) == undefined) {
                redirect(
                  `/result/error/${encodeURIComponent(
                    "Internal Error: Failed to navigate to a previous page"
                  )}`
                );
              } else {
                setSituationHistory((prev) => [
                  ...prev,
                  situationHistory.at(navigate)!,
                ]);
              }
            } else {
              setSituationHistory((prev) => [...prev, navigate]);
            }
          };

          return (
            <GhostButton
              onClick={() => handleClick()}
              disabled={disabled}
            >
              {description}
            </GhostButton>
          );
        };
        return { description, component };
        break;
      }
      // Navigate to a result page
      case "end": {
        const { description, navigate, requiredItems = {}, message } = option;
        const component: Action["component"] = ({ inventory }) => {
          // Check if there are necessary items for selecting the option
          const disabled = !(
            Object.keys(requiredItems).every((itemName) => {
              const name = itemName as keyof typeof requiredItems;
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              inventory[name] ?? -1 > requiredItems[name]! // Object.keys(obj) will not return a property that is not in the obj
            })
          );
          let href;
          switch (navigate) {
            case NAVIGATION_TARGET.SUCCESS:
              href = `result/success/${encodeURIComponent(message)}`;
              break;
            case NAVIGATION_TARGET.FAILURE:
              href = `result/failure/${encodeURIComponent(message)}`;
              break;
            default:
              href = `result/error/${encodeURIComponent(
                "Internal error: Failed to parse the exiting option"
              )}`;
          }
          return (
            <GhostButton
              disabled={disabled}
              asChild
            >
              <Link href={href} aria-disabled="true" tabIndex={-1}>
                {description}
              </Link>
            </GhostButton>
          );
        };
        return { description, component };
        break;
      }
      case "raw":
        return option;
        break;
    }
  });
  return { description, possibleActions };
}
