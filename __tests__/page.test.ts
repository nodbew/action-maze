import { test, expect } from "@playwright/test";

test("There is a heading", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(page.getByRole("heading")).toBeVisible();
});

test("Start button redirects correctly", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Start" }).click();
  await expect(page).toHaveURL(/.*dungeon/);
});

test("Info button shows a dialog correctly", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "info" }).click();
  await expect(page.getByRole("heading", { name: "Story" })).toBeVisible();
  await expect(page.getByText("One morning, you woke up in a")).toBeVisible();
  await expect(page.getByRole("button", { name: "Close" })).toBeVisible();
  await page.getByRole("button", { name: "Close" }).click();
  await expect(page.getByRole("dialog", { name: "Story" })).toBeHidden();
});

test("Credits button redirects correctly", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Credits" }).click();
  await expect(page).toHaveURL(/.*\/credits/);
});
