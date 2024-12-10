"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";
import { publishPostAndView } from "../helpers/post-publish-helper";


test.describe("EB Advanced Video", () => {
  test("can insert an Advanced Video block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Advanced Video ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.ADVANCED_VIDEO });

    // Check visibility in the editor
    await page
      .locator('iframe[title="Essential Blocks For Gutenberg - Instantly Design Stunning Websites With Ready Blocks"]')
      .contentFrame()
      .locator("div")
      .filter({ hasText: "Essential Blocks For" })
      .nth(4)
      .waitFor();
    await expect.soft(
      page
        .locator(
          'iframe[title="Essential Blocks For Gutenberg - Instantly Design Stunning Websites With Ready Blocks"]'
        )
        .contentFrame()
        .locator("div")
        .filter({ hasText: "Essential Blocks For" })
        .nth(4)
    ).toBeVisible();

    // Publish the post
    const page1 = await publishPostAndView(page);


    // Check frontend visibility
    await expect.soft(
      page1
        .locator(
          'iframe[title="Essential Blocks For Gutenberg - Instantly Design Stunning Websites With Ready Blocks"]'
        )
        .contentFrame()
        .getByRole("link", { name: "Essential Blocks For" })
    ).toBeVisible();
  });
});
