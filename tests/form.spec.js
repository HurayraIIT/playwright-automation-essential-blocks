"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks, EB_PRO_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";

test.describe("EB Form", () => {
  test("can insert a Form block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Form ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.FORM });

    // Insert content
    await expect(page.getByRole("heading", { name: "Please Select a Form Type" })).toBeVisible();
    await expect(page.locator("div").filter({ hasText: /^Contact Form$/ })).toBeVisible();
    await expect(page.locator("div").filter({ hasText: /^Subscription Form$/ })).toBeVisible();
    await expect(page.locator("div").filter({ hasText: /^RSVP Form$/ })).toBeVisible();
    await expect(page.locator("div").filter({ hasText: /^Blank$/ })).toBeVisible();
    await page
      .locator("div")
      .filter({ hasText: /^Subscription Form$/ })
      .click();
    await expect(page.getByText("Add Form Field")).toBeVisible();
    await expect(page.getByText("Get The Latest Updates")).toBeVisible();
    await expect(page.getByText("Through Our Newsletter")).toBeVisible();
    await expect(page.getByText("Email", { exact: true })).toBeVisible();
    await expect(page.getByLabel("Add block")).toBeVisible();

    // Check visibility in the editor

    // Publish the post
    await page.getByRole("button", { name: "Publish", exact: true }).click();
    await page.getByRole("button", { name: "Save", exact: true }).waitFor();
    await expect.soft(page.getByRole("button", { name: "Save", exact: true })).toBeVisible();

    // Open the post frontend
    await expect.soft(page.getByLabel("View Post")).toBeVisible();
    const page1Promise = page.waitForEvent("popup");
    await page.getByLabel("View Post").click();
    const page1 = await page1Promise;

    // Check frontend visibility
    await expect(page1.getByText("Get The Latest Updates")).toBeVisible();
    await expect(page1.getByRole("heading", { name: "Through Our Newsletter" })).toBeVisible();
    await expect(page1.getByText("Email *")).toBeVisible();
    await expect(page1.getByPlaceholder("email@example.com")).toBeVisible();
    await expect(page1.getByRole("button", { name: "Submit" })).toBeVisible();
  });
});
