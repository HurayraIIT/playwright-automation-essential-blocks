"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";

test.describe("EB Shape Divider", () => {
  test("can insert an Shape Divider block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Shape Divider ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.SHAPE_DIVIDER });

    //checking block visibility in editor

    await expect(page.locator('clipPath#eb-shape-divider-ocean-wave>path.eb-shape-divider-fill')).toBeVisible();

    // Publish the post
    await page.getByRole('button', { name: 'Publish', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Save', exact: true })).toBeVisible();
    await expect(page.getByLabel('View Post')).toBeVisible();
    const page1Promise = page.waitForEvent('popup');
    await page.getByLabel('View Post').click();
    const page1 = await page1Promise;

    //checking block visibility in post
    await expect(page1.locator('h1:has-text("EB Shape Divider 2")')).toBeVisible();

    await expect(page1.locator('clipPath#eb-shape-divider-ocean-wave>path.eb-shape-divider-fill')).toBeVisible();

  });
});