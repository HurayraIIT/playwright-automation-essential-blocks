"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";
import { publishPostAndView } from "../helpers/post-publish-helper";

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
    const page1 = await publishPostAndView(page);
    
    //checking block visibility in post
    await expect.soft(page1.locator('h1:has-text("EB Popup 2")')).toBeVisible();
    await page1.getByRole('button', { name: 'Open Popup' }).click();
    await expect.soft(page1.getByText("Active Users")).toBeVisible();
  });
});
