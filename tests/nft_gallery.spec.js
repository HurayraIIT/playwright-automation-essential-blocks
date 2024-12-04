"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";

test.describe("EB NFT Gallery", () => {
  test("can insert an NFT Gallery block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB NFT Gallery ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.NFT_GALLERY });

    await expect(page.locator('.title')).toBeVisible();
    await expect(page.getByText("Please add NFT API")).toBeVisible();

    // Publish the post
    await page.getByRole("button", { name: "Publish", exact: true }).click();
    await page.getByRole("button", { name: "Save", exact: true }).waitFor();
    await expect.soft(page.getByRole("button", { name: "Save", exact: true })).toBeVisible();

    await expect.soft(page.getByLabel("View Post")).toBeVisible();
    const page1Promise = page.waitForEvent("popup");
    await page.getByLabel("View Post").click();
    const page1 = await page1Promise;

    //checking block visibility in post
    await expect.soft(page1.locator('h1:has-text("EB NFT Gallery 2")')).toBeVisible();
  });
});
