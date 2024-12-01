"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";

test.describe("EB Typing Text", () => {
  test("can insert an Typing Text block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Typing Text ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.TYPING_TEXT });

    //checking block visibility in editor

    await expect(page.locator('span.eb-typed-prefix')).toBeVisible();
    await expect(page.locator('span.eb-typed-text')).toBeVisible();
    await expect(page.locator('span.eb-typed-suffix')).toBeVisible();


    // Publish the post
    await page.getByRole('button', { name: 'Publish', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Save', exact: true })).toBeVisible();
    await expect(page.getByLabel('View Post')).toBeVisible();
    const page1Promise = page.waitForEvent('popup');
    await page.getByLabel('View Post').click();
    const page1 = await page1Promise;

    //checking block visibility in post
    await expect(page1.locator('h1:has-text("EB Typing Text 2")')).toBeVisible();

    await expect(page1.locator('span.eb-typed-prefix')).toBeVisible();

    await expect(page1.locator('span.eb-typed-suffix')).toBeVisible();
  });
});