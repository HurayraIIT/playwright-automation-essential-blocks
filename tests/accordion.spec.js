"use strict";
import { test, expect } from "../global-setup";

let slug = "/demo/accordion";
let heading = "Accordion";

test.describe("Accordion", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(slug);
    console.log(page.url());
    await expect(page.getByRole("heading", { name: "Accordion", exact: true })).toBeVisible();
  });

  test("has title", async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Accordion | Essential Gutenberg Blocks for WordPress/);
  });
});
