"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";

test.describe("EB Wrapper", () => {
  test("can insert a Wrapper block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Wrapper ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.WRAPPER });

    //checking block visibility in editor

    await page.getByLabel('Add block').click();
    await page.getByPlaceholder('Search').fill("Number Counter");
    await page.getByRole('option', { name: 'Number Counter' }).click();
    await expect.soft(await page.getByText('Active Users')).toBeVisible();
    
    // Publish the post
    await page.getByRole("button", { name: "Publish", exact: true }).click();
    await page.getByRole("button", { name: "Save", exact: true }).waitFor();
    await expect.soft(page.getByRole("button", { name: "Save", exact: true })).toBeVisible();

    await expect.soft(page.getByLabel("View Post")).toBeVisible();
    const page1Promise = page.waitForEvent("popup");
    await page.getByLabel("View Post").click();
    const page1 = await page1Promise;

    //checking block visibility in post
    await expect.soft(page1.locator('h1:has-text("EB Wrapper 2")')).toBeVisible();
    await expect.soft(await page1.getByText('Active Users')).toBeVisible();

  });
});
