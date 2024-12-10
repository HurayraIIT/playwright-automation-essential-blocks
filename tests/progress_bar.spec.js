"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";
import { publishPostAndView } from "../helpers/post-publish-helper";


test.describe("EB Progress bar", () => {
  test("can insert an Progress bar block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Progress bar ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.PROGRESS_BAR });

    //checking block visibility in editor
    await page.waitForTimeout(500);
    await expect(page.locator('div[role="textbox"][class*="block-editor-rich-text__editable"][contenteditable="true"]')).toBeVisible();
    await expect(page.getByLabel('Editor content').getByText('50%')).toBeVisible();


    // Publish the post
    const page1 = await publishPostAndView(page);


    //checking block visibility in post
    await expect(page1.locator('h1:has-text("EB Progress bar 2")')).toBeVisible();
    await page1.waitForTimeout(500);
    await expect(page1.locator('div.eb-progressbar-title')).toBeVisible();
  });
});