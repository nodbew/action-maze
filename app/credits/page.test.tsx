import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { LICENSES } from "@/features/licensing/data";
import Page from "./page";

describe.concurrent("All credits are properly shown on the screen", () => {
  render(<Page />);

  it("All credit names are shown", () => {
    Object.keys(LICENSES).forEach((packageName) => {
      expect(screen.getByText(packageName)).toBeInTheDocument();
      expect(screen.getByText(packageName)).not.toHaveStyle({
        display: "none",
      });
    });
  });

  it("All credit contents are shown", () => {
    Object.keys(LICENSES).forEach(async (packageName) => {
      // Added async here
      const button = screen.getByText(packageName);
      await user.click(button);

      const dialog = screen.getByRole("dialog");
      const origin = dialog.querySelector("a")?.origin;
      const closeButton = dialog.querySelector("svg");
      expect(origin).toContain("github");
      if (closeButton == undefined) {
        throw new Error("Close button not found");
      }
      user.click(closeButton);
    });
  });
});
