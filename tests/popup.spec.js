"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";

test.describe("EB Popup", () => {
  test("can insert an Popup block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Popup ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.POPUP });

    await expect(page.getByText(" Design your popup content below using blocks")).toBeVisible();
    await page.locator("button[aria-label='Add block']").click();
    await page.getByPlaceholder('Search').fill("number counter");
    await page.getByRole('option', { name: 'Number Counter' }).click();
    await expect.soft(page.getByText("Active Users")).toBeVisible();
    // Publish the post
    await page.getByRole("button", { name: "Publish", exact: true }).click();
    await page.getByRole("button", { name: "Save", exact: true }).waitFor();
    await expect.soft(page.getByRole("button", { name: "Save", exact: true })).toBeVisible();

    await expect.soft(page.getByLabel("View Post")).toBeVisible();
    const page1Promise = page.waitForEvent("popup");
    await page.getByLabel("View Post").click();
    const page1 = await page1Promise;
    
    //checking block visibility in post
    await expect.soft(page1.locator('h1:has-text("EB Popup 2")')).toBeVisible();
    await page1.getByRole('button', { name: 'Open Popup' }).click();
    await expect.soft(page1.getByText("Active Users")).toBeVisible();
  });
});
