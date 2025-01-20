"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";
import { publishPostAndView } from "../helpers/post-publish-helper";


test.describe("EB Shape Divider", () => {
  test("can insert an Shape Divider block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Shape Divider ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.SHAPE_DIVIDER });

    //checking block visibility in editor

    await expect(page.getByLabel('Editor content').locator('g path')).toBeVisible();

    // Publish the post
    const page1 = await publishPostAndView(page);


    //checking block visibility in post
    await expect(page1.locator('h1:has-text("EB Shape Divider 2")')).toBeVisible();

    await expect(page1.locator('.eb-shape-divider-wrapper')).toBeVisible();

  });
});