"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks, EB_PRO_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";

test.describe("EB Icon Picker", () => {
  test("can insert an Icon Picker block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Icon Picker ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.ICON });

    // Insert content

    // Check visibility in the editor
    await expect(page.getByLabel("Block: Icon Picker").locator("div").nth(1)).toBeVisible();
    await expect(page.getByLabel("Editor content").locator("i")).toBeVisible();

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
    await expect(page1.locator(".eb-icon-wrapper")).toBeVisible();
    await expect(page1.locator("i")).toHaveAttribute("icon", /fa-check-circle/);
  });
});
