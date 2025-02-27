"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";
import { publishPostAndView } from "../helpers/post-publish-helper";

test.describe("EB Image Gallery", () => {
  test("can insert a Image Gallery block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Image Gallery ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.IMAGE_GALLERY });

    //start with media library
    await expect.soft(page.getByRole("button", { name: "Start Blank", exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Start Blank" }).click();
    await page.getByLabel('Edit gallery').click();
    await page.getByRole('tab', { name: 'Add to gallery' }).click();



    //inserting image from media library
    let image_elements = await page.locator('li.attachment.save-ready');
    var count = 2;
    for (let i = 0; i < count; i++) {
        const image_element = image_elements.nth(i);
        await expect.soft(image_element).toBeVisible();
        const isChecked = await image_element.getAttribute('aria-checked');
        if (isChecked !== 'true') {
            await image_element.click(); 
        }
    }

    await page.getByRole('button', { name: 'Add to gallery' }).click();
    await page.getByRole('button', { name: 'Update gallery' }).click();

    // Publish the post
    const page1 = await publishPostAndView(page);

    //checking block visibility in post
    await expect.soft(page1.locator('h1:has-text("EB Image Gallery 2")')).toBeVisible();

    
    
  });
});
