"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";

test.describe("EB Feature List", () => {
  test("can insert an Feature List block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Feature List ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.FEATURE_LIST });

    //checking block visibility in editor
    await expect(page.getByLabel('Editor content').getByText('Feature Item 1')).toBeVisible();
    await expect(page.getByLabel('Editor content').getByText('Feature Item 2')).toBeVisible();
    await expect(page.getByLabel('Editor content').getByText('Feature Item 3')).toBeVisible();

    // Publish the post
    await page.getByRole('button', { name: 'Publish', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Save', exact: true })).toBeVisible();
    await expect(page.getByLabel('View Post')).toBeVisible();
    const page1Promise = page.waitForEvent('popup');
    await page.getByLabel('View Post').click();
    const page1 = await page1Promise;

    //checking block visibility in post
    await expect(page.getByLabel('Editor content').getByText('Feature Item 1')).toBeVisible();
    await expect(page.getByLabel('Editor content').getByText('Feature Item 2')).toBeVisible();
    await expect(page.getByLabel('Editor content').getByText('Feature Item 3')).toBeVisible();
    
    await expect(page1.getByText("EB Feature List 2")).toBeVisible();
  });
});