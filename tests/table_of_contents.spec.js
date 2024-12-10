"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";
import { publishPostAndView } from "../helpers/post-publish-helper";

test.describe("EB Table of Contents", () => {
  test("can insert an Table of Contents block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Table of Contents ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.TABLE_OF_CONTENTS });

    await expect(page.locator("h2[aria-label='Table of content']")).toBeVisible();

    // Publish the post
    const page1 = await publishPostAndView(page);
    
    //checking block visibility in post
    await expect.soft(page1.locator('h1:has-text("EB Table of Contents 2")')).toBeVisible();
    await expect.soft(page1.locator(".eb-toc-title")).toBeVisible();

  });
});
