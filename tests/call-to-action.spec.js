"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";
import { publishPostAndView } from "../helpers/post-publish-helper";


test.describe("EB Call To Action", () => {
  test("can insert a Call To Action block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Call To Action ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.CALL_TO_ACTION });

    //checking block visibility in editor
    await expect.soft(page.getByLabel("Editor content").getByText("Essential Blocks for Gutenberg")).toBeVisible();

    // Publish the post
    const page1 = await publishPostAndView(page);


    //checking block visibility in post
    await expect.soft(page1.locator('h1:has-text("EB Call TO Action 2")')).toBeVisible();
    await expect.soft(page.getByText("Essential Blocks for Gutenberg")).toBeVisible();
  });
});
