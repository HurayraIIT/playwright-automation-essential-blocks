"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";
import { publishPostAndView } from "../helpers/post-publish-helper";

test.describe("EB Post Carousel", () => {
  test("can insert an Post Carousel block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Post Carousel ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.POST_CAROUSEL });

    await expect.soft(page.getByRole("button", { name: "Start Blank", exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Start Blank" }).click();

    await expect(page.locator('div:nth-child(1) > div > .ebpg-carousel-post > .ebpg-carousel-post-holder')).toBeVisible();

    // Publish the post
    const page1 = await publishPostAndView(page);
    
    //checking block visibility in post
    await expect.soft(page1.locator('h1:has-text("EB Post Carousel 2")')).toBeVisible();
    await expect.soft(page1.locator('.ebpg-carousel-post-holder').first()).toBeVisible();

  });
});
