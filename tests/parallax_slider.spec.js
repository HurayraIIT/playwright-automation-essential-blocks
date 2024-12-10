"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";
import { publishPostAndView } from "../helpers/post-publish-helper";

test.describe("EB Parallax Slider", () => {
  test("can insert a Parallax Slider block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Parallax Slider ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.PARALLAX_SLIDER });

    //start with media library
    await expect.soft(page.getByRole("button", { name: "Media Library", exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Media Library" }).click()

    //inserting image from media library
    let image_elements = await page.locator('li.attachment.save-ready');
    var count = 6;
    for (let i = 0; i < count; i++) {
        const image_element = image_elements.nth(i);
        await expect.soft(image_element).toBeVisible();
        const isChecked = await image_element.getAttribute('aria-checked');
        if (isChecked !== 'true') {
            await image_element.click(); 
        }
    }


    await expect.soft(page.getByRole("button", { name: "Create a new gallery", exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Create a new gallery" }).click()

    await expect.soft(page.getByRole("button", { name: "Insert gallery", exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Insert gallery" }).click()


    //checking slide function in editor
    var count = await page.locator('ul>li.slide').count();
    for (let i = 0; i < count - 1; i++) {
        var next_SlideElement = await page.locator('ul>li.slide.slide--next');
        if (await next_SlideElement.isVisible()) {
            await next_SlideElement.click();
        }
    }


    // Publish the post
    const page1 = await publishPostAndView(page);

    //checking block visibility in post
    await expect.soft(page1.locator('h1:has-text("EB Parallax Slider 2")')).toBeVisible();

    //checking block visibility in editor
    var count = await page1.locator('ul>li.slide').count();
    for (let i = 0; i < count - 2; i++) {
        var next_SlideElement = await page1.locator('ul>li.slide.slide--next');
        if (await next_SlideElement.isVisible()) {
            await next_SlideElement.click();
        }
    }
    
  });
});
