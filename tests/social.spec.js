"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";
import { publishPostAndView } from "../helpers/post-publish-helper";

test.describe("EB Social Icon", () => {
  test("can insert an Social Icon block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Social Icon ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.SOCIAL });

    await expect(page.getByLabel('social link').first()).toBeVisible();

    // Publish the post
    const page1 = await publishPostAndView(page);
    
    //checking block visibility in post
    await expect.soft(page1.locator('h1:has-text("EB Social Icon 2")')).toBeVisible();
    await expect.soft(page1.getByLabel('social link').first()).toBeVisible();

  });
});
