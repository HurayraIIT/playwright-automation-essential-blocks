"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";
import { publishPostAndView } from "../helpers/post-publish-helper";

test.describe("EB Openverse", () => {
  test("can insert a Openverse block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Openverse ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.OPENVERSE });

    //checking block visibility in editor
    var search_btn = await page.locator('button.openverse-search-btn');
    await expect.soft(search_btn).toBeVisible();

    var input_fieald = await page.locator('input#search-form');
    await expect.soft(input_fieald).toBeVisible();
    await input_fieald.click();
    await input_fieald.fill('wordpress');

    await search_btn.click();

    await expect.soft(page.locator('div.eb_openverse_item_thumbnail').first()).toBeVisible();
    await page.locator('div.eb_openverse_item_thumbnail').first().click();

    await expect.soft(page.locator('.select-btn')).toBeVisible();
    await page.locator('.select-btn').click();
    await page.waitForTimeout(3000);
    
    await expect.soft(page.locator('div.image-wrapper>img')).toBeVisible();
    // Publish the post
    const page1 = await publishPostAndView(page);

    //checking block visibility in post
    await expect.soft(page1.locator('h1:has-text("EB Openverse 2")')).toBeVisible();
    await expect.soft(page1.locator('div.image-wrapper>img')).toBeVisible();
  });
});
