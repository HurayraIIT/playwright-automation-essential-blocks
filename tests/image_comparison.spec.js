"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";
import { publishPostAndView } from "../helpers/post-publish-helper";

test.describe("EB Image Comparison", () => {
  test("can insert a Image Comparison block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Image Comparison ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.IMAGE_COMPARISON });

    //start with media library

    //inserting the right image
    var right_image = await page.getByLabel("Editor").locator("button[aria-label='Upload Right Image']");
    await expect.soft(right_image).toBeVisible();
    await right_image.click();

    var image_element = await page.locator('li.attachment.save-ready').first();
    await expect.soft(image_element).toBeVisible();
    await image_element.click();
    
    await expect.soft(page.locator('div.media-toolbar-primary>button.media-button')).toBeVisible();
    await page.locator('div.media-toolbar-primary>button.media-button').click();


    //inserting the left image
    var left_image = await page.getByLabel("Editor").locator("button[aria-label='Upload Left Image']");
    await expect.soft(left_image).toBeVisible();
    await left_image.click();

    var image_element = await page.locator('li.attachment.save-ready').last();
    await expect.soft(image_element).toBeVisible();
    await image_element.click();
    
    await expect.soft(page.locator('div.media-toolbar-primary>button.media-button')).toBeVisible();
    await page.locator('div.media-toolbar-primary>button.media-button').click();




    // Publish the post
    const page1 = await publishPostAndView(page);

    //checking block visibility in post
    await expect.soft(page1.locator('h1:has-text("EB Image Comparison 2")')).toBeVisible();
    
  });
});
