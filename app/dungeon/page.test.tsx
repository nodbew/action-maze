import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ITEMS } from "@/features/game/data";
import Page from "./page";

describe.concurrent("All credits are properly shown on the screen", () => {
  render(<Page />);

  it("The reset button is shown correctly", () => {
    const resetButton = screen.getByRole("link", { name: "Reset" });
    expect(resetButton).toBeInTheDocument();
    expect(resetButton).toBeInstanceOf(HTMLAnchorElement);
    expect((resetButton as HTMLAnchorElement).pathname).toStrictEqual("/");
  });
  it("The inventory box is shown correctly", () => {
    const box = screen.getByTestId("Inventory");
    expect(box).toBeInstanceOf(HTMLDivElement);

    const availableItems = Object.keys(ITEMS);
    (box as HTMLDivElement).querySelectorAll("option").forEach((item) => {
      expect(item.value in availableItems).toBe(true);
      // Check if the item is configurated to be shown
      expect(ITEMS[item.value as keyof typeof ITEMS].show).toBe(true);
      // Check if the item is stackable
      expect(
        ITEMS[item.value as keyof typeof ITEMS].stackable
          ? Array.from(
              (box as HTMLDivElement).querySelectorAll("option")
            ).filter((opt) => opt.value === item.value).length === 1
          : true
      ).toBe(true);
    });
  });
  it("The title is shown correctly", () =>
    expect(
      screen.getByRole("heading", { hidden: false, level: 1 })
    ).toBeInTheDocument());
  it("The actions are shown correctly", () => {
    // Command component has a label, but it's empty because the page doesn't assign it
    const actions = screen.getByTestId("Actions");
    expect(actions).toBeInstanceOf(HTMLDivElement);

    // Check all options contain either a link to the end or a button
    actions!.querySelectorAll("option").forEach((action) => {
      if (action.querySelector("a") != null) {
        expect(
          action.querySelector("a")!.pathname.split("/")[1] in
            ["success", "failure", "error"]
        ).toBe(true);
      } else {
        expect(action.querySelector("button")).toBeInstanceOf(HTMLDivElement);
        expect(action.querySelector("button")?.onclick).toBeDefined();
      }
    });
  });
});
