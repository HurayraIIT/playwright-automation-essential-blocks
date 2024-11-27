"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";

test.describe("EB Image Gallery", () => {
  test("can insert a Image Gallery block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Image Gallery ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.IMAGE_GALLERY });

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




    // Publish the post
    await page.getByRole("button", { name: "Publish", exact: true }).click();
    await page.getByRole("button", { name: "Save", exact: true }).waitFor();
    await expect.soft(page.getByRole("button", { name: "Save", exact: true })).toBeVisible();

    await expect.soft(page.getByLabel("View Post")).toBeVisible();
    const page1Promise = page.waitForEvent("popup");
    await page.getByLabel("View Post").click();
    const page1 = await page1Promise;

    //checking block visibility in post
    await expect.soft(page1.locator('h1:has-text("EB Image Gallery 2")')).toBeVisible();

    
    
  });
});
