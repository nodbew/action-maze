import { render, screen } from "@testing-library/react";
import { afterAll, describe, expect, it } from "vitest";
import user from "@testing-library/user-event";
import Page from "./page";

render(<Page />);
describe.concurrent("There are necessary contents rendered", () => {
  it("There is a title", () =>
    expect(screen.getByRole("heading")).toBeInTheDocument());
  it("There is a start button", () =>
    expect(screen.getByRole("link", { name: "Start" })).toBeInstanceOf(
      HTMLAnchorElement
    ));
  it("There is an info button", () =>
    expect(screen.getByRole("button", { name: "info" })).toBeInstanceOf(
      HTMLButtonElement
    ));
  it("There is a credits button", () =>
    expect(screen.getByRole("link", { name: "Credits" })).toBeInstanceOf(
      HTMLAnchorElement
    ));
});
describe.concurrent("Links are correctly rendered", () => {
  it("The start button correctly navigates to /dungeon", () =>
    expect(
      (screen.getByRole("link", { name: "Start" }) as HTMLAnchorElement)
        .pathname
    ).toStrictEqual("/dungeon"));
  it("The credits button correctly navigates to /credits", () =>
    expect(
      (screen.getByRole("link", { name: "Credits" }) as HTMLAnchorElement)
        .pathname
    ).toStrictEqual("/credits"));
});
afterAll(() =>
  describe("The content of the info dialog is valid", async () => {
    await user.click(screen.getByRole("button", { name: "info" }));
    const dialog = screen.getByRole("dialog");
    it("There is a title", () =>
      expect(dialog.querySelector('[role="heading"]')).toBeInTheDocument());
    it("There is a content", () =>
      expect(dialog.querySelector('[role="paragraph]')).toBeInTheDocument());
  })
);
