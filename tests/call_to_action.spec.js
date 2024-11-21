"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";

test.describe("EB Call TO Action", () => {
  test("can insert an Call TO Action block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Call TO Action ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.CALL_TO_ACTION });

    //checking block visibility in editor
    await expect(page.getByLabel('Editor content').getByText('Essential Blocks for Gutenberg')).toBeVisible();

    // Publish the post
    await page.getByRole('button', { name: 'Publish', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Save', exact: true })).toBeVisible();
    await expect(page.getByLabel('View Post')).toBeVisible();
    const page1Promise = page.waitForEvent('popup');
    await page.getByLabel('View Post').click();
    const page1 = await page1Promise;

    //checking block visibility in post
    await expect(page.getByLabel('Editor content').getByText('Essential Blocks for Gutenberg')).toBeVisible();

    await expect(page1.getByText("EB Call TO Action 2")).toBeVisible();
  });
});