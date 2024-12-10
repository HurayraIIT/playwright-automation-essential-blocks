"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks, EB_PRO_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";
import { publishPostAndView } from "../helpers/post-publish-helper";

test.describe("EB Icon Picker", () => {
  test("can insert an Icon Picker block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Icon Picker ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.ICON });

    // Insert content

    // Check visibility in the editor
    await expect.soft(page.getByLabel("Block: Icon Picker").locator("div").nth(1)).toBeVisible();
    await expect.soft(page.getByLabel("Editor content").locator("i")).toBeVisible();

    // Publish the post
    const page1 = await publishPostAndView(page);


    // Check frontend visibility
    await expect.soft(page1.locator(".eb-icon-wrapper")).toBeVisible();
    await expect.soft(page1.locator("i")).toHaveAttribute("icon", /fa-check-circle/);
  });
});
