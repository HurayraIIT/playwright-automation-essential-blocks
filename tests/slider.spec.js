"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";
import { publishPostAndView } from "../helpers/post-publish-helper";


test.describe("EB Slider", () => {
  test("can insert an Slider block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Slider ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.SLIDER });

    //checking block visibility in editor

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
    await page.getByRole("button", { name: "Create a new gallery" }).click();

    await expect.soft(page.getByRole("button", { name: "Insert gallery", exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Insert gallery" }).click();

    

    //checking slide function in editor
    var count = await page.locator('div.slick-slide.slick-cloned').count();
    for (let i = 0; i < count - 1; i++) {
        var next_SlideElement = await page.locator('div.slick-arrow.slick-next');
        if (await next_SlideElement.isVisible()) {
            await page.waitForTimeout(500);
            await next_SlideElement.click();
        }
    }

    // Publish the post
    const page1 = await publishPostAndView(page);


    //checking block visibility in post
    await expect(page1.locator('h1:has-text("EB Slider 2")')).toBeVisible();


    //checking slide function in editor
    for (let i = 0; i < 6; i++) {
        var next_SlideElement = await page1.locator('i.fas.fa-arrow-alt-circle-right');
        if (await next_SlideElement.isVisible()) {
            await page1.waitForTimeout(500);
            await next_SlideElement.click();
        }
    }
  });
});