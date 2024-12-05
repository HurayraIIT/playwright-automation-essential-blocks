"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";

test.describe("EB Post Grid", () => {
  test("can insert an Post Grid block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Post Grid ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.POST_GRID });

    await expect.soft(page.getByRole("button", { name: "Start Blank", exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Start Blank" }).click();

    await expect(page.locator('.ebpg-entry-media').first()).toBeVisible();

    // Publish the post
    await page.getByRole("button", { name: "Publish", exact: true }).click();
    await page.getByRole("button", { name: "Save", exact: true }).waitFor();
    await expect.soft(page.getByRole("button", { name: "Save", exact: true })).toBeVisible();

    await expect.soft(page.getByLabel("View Post")).toBeVisible();
    const page1Promise = page.waitForEvent("popup");
    await page.getByLabel("View Post").click();
    const page1 = await page1Promise;
    
    //checking block visibility in post
    await expect.soft(page1.locator('h1:has-text("EB Post Grid 2")')).toBeVisible();
    await expect.soft(page1.locator('.ebpg-entry-thumbnail').first()).toBeVisible();

  });
});
