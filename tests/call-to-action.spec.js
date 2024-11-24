"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";

test.describe("EB Call To Action", () => {
  test("can insert a Call To Action block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Call To Action ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.CALL_TO_ACTION });

    //checking block visibility in editor
    await expect(page.getByLabel("Editor content").getByText("Essential Blocks for Gutenberg")).toBeVisible();

    // Publish the post
    await page.getByRole("button", { name: "Publish", exact: true }).click();
    await page.getByRole("button", { name: "Save", exact: true }).waitFor();
    await expect(page.getByRole("button", { name: "Save", exact: true })).toBeVisible();
    await expect(page.getByLabel("View Post")).toBeVisible();
    const page1Promise = page.waitForEvent("popup");
    await page.getByLabel("View Post").click();
    const page1 = await page1Promise;

    //checking block visibility in post
    await expect(page1.locator('h1:has-text("EB Call TO Action 2")')).toBeVisible();
    await expect(page.getByText("Essential Blocks for Gutenberg")).toBeVisible();
  });
});
