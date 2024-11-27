"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";

test.describe("EB Ineractive Promo", () => {
  test("can insert a Ineractive Promo block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Ineractive Promo ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.INTERACTIVE_PROMO });

    //start with media library
    await expect.soft(page.getByRole("button", { name: "Media Library", exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Media Library" }).click()

    //inserting image from media library
    let image_element = await page.locator('li.attachment.save-ready').first();
    await expect.soft(image_element).toBeVisible();
    await image_element.click();

    await expect.soft(page.locator('div.media-toolbar-primary>button.media-button')).toBeVisible();
    await page.locator('div.media-toolbar-primary>button.media-button').click();


    await page.locator('h2.eb-interactive-promo-header').hover();
    await expect.soft(page.getByLabel("Editor content").getByText("Header")).toBeVisible();
    await expect.soft(page.getByLabel("Editor content").getByText("Content Text")).toBeVisible();


    // Publish the post
    await page.getByRole("button", { name: "Publish", exact: true }).click();
    await page.getByRole("button", { name: "Save", exact: true }).waitFor();
    await expect.soft(page.getByRole("button", { name: "Save", exact: true })).toBeVisible();

    await expect.soft(page.getByLabel("View Post")).toBeVisible();
    const page1Promise = page.waitForEvent("popup");
    await page.getByLabel("View Post").click();
    const page1 = await page1Promise;

    //checking block visibility in post
    await expect.soft(page1.locator('h1:has-text("EB Ineractive Promo 2")')).toBeVisible();

    await page1.locator('h2.eb-interactive-promo-header').hover();
    await expect.soft(page1.locator('h2.eb-interactive-promo-header')).toBeVisible();
    await expect.soft(page1.locator('p.eb-interactive-promo-content')).toBeVisible();
    
  });
});
