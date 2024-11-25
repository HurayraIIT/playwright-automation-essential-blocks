"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";

test.describe("EB Progress bar", () => {
  test("can insert an Progress bar block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Progress bar ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.PROGRESS_BAR });

    //checking block visibility in editor

    await expect(page.locator('div[role="textbox"][class*="block-editor-rich-text__editable"][contenteditable="true"]')).toBeVisible();
    await expect(page.getByLabel('Editor content').getByText('50%')).toBeVisible();


    // Publish the post
    await page.getByRole('button', { name: 'Publish', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Save', exact: true })).toBeVisible();
    await expect(page.getByLabel('View Post')).toBeVisible();
    const page1Promise = page.waitForEvent('popup');
    await page.getByLabel('View Post').click();
    const page1 = await page1Promise;

    //checking block visibility in post
    await expect(page1.locator('h1:has-text("EB Progress bar 2")')).toBeVisible();

    await expect(page1.locator('div.eb-progressbar-title')).toBeVisible();
    await expect(page1.getByText('50%')).toBeVisible();
  });
});