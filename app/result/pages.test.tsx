import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ErrorPage from "./error/[message]/page";
import FailurePage from "./failure/[message]/page";
import SuccessPage from "./success/[message]/page";

const createPromise = async <T,>(obj: T) => obj;
let { rerender } = render(<></>);
describe.for([
  ["Error page", ErrorPage],
  ["Failure page", FailurePage],
  ["Success page", SuccessPage],
] as const)("Test: %s", ([pageName, page]) => {
  describe.concurrent(
    `${pageName}: The page is correctly generated with valid data`,
    async () => {
      rerender(
        await page({
          params: createPromise({
            message: encodeURIComponent(
              `This is a test message for ${pageName}`
            ),
          }),
        })
      );
      it("There is a title", () =>
        expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument());
      it("There is a description of the error", () =>
        expect(screen.getByRole("paragraph")).toBeInTheDocument());
      it("There is a reset button", () => {
        const link = screen.getByRole("link");
        expect(link).toBeInTheDocument();
        expect(link).toBeInstanceOf(HTMLAnchorElement);
        expect((link as HTMLAnchorElement).pathname).toStrictEqual("/");
      });
    }
  );
  describe(`${pageName}: The page errors with a malformed URI`, () => {
    it("Malformed URI errors", () =>
      expect(
        async () =>
          await page({ params: createPromise({ message: "%E0%A4%A" }) })
      ).rejects.toThrow());
  });
});
