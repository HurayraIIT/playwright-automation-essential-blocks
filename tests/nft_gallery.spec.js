"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";
import { publishPostAndView } from "../helpers/post-publish-helper";

test.describe("EB NFT Gallery", () => {
  test("can insert an NFT Gallery block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB NFT Gallery ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.NFT_GALLERY });

    await expect(page.locator('.title')).toBeVisible();
    await expect(page.getByText("Please add NFT API")).toBeVisible();

    // Publish the post
    const page1 = await publishPostAndView(page);

    //checking block visibility in post
    await expect.soft(page1.locator('h1:has-text("EB NFT Gallery 2")')).toBeVisible();
  });
});
