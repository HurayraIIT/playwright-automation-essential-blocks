"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";
import { publishPostAndView } from "../helpers/post-publish-helper";


test.describe("EB Dual Button", () => {
  test("can insert a Dual Button block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Dual Button ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.DUAL_BUTTON });

    // Insert content
    await page.getByLabel("Add Text..").nth(0).fill("Click me first 241124!");
    await page.getByLabel("Add Text..").nth(1).fill("Click me second 241124!");
    await page.waitForTimeout(500);

    // Check visibility in the editor

    // Publish the post
    const page1 = await publishPostAndView(page);


    // Check frontend visibility
    await expect.soft(page1.getByRole("link", { name: "Click me first 241124!" })).toBeVisible();
    await expect.soft(page1.getByRole("link", { name: "Click me second 241124!" })).toBeVisible();
  });
});
