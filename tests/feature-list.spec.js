"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";
import { publishPostAndView } from "../helpers/post-publish-helper";

test.describe("EB Feature List", () => {
  test("can insert a Feature List block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Feature List ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.FEATURE_LIST });

    //checking block visibility in editor
    await expect.soft(page.getByLabel("Editor content").getByText("Feature Item 1")).toBeVisible();
    await expect.soft(page.getByLabel("Editor content").getByText("Feature Item 2")).toBeVisible();
    await expect.soft(page.getByLabel("Editor content").getByText("Feature Item 3")).toBeVisible();

    // Publish the post
    const page1 = await publishPostAndView(page);

    //checking block visibility in post
    await expect.soft(page1.locator('h1:has-text("EB Feature List 2")')).toBeVisible();
    await expect.soft(page1.getByText("Feature Item 1")).toBeVisible();
    await expect.soft(page1.getByText("Feature Item 2")).toBeVisible();
    await expect.soft(page1.getByText("Feature Item 3")).toBeVisible();
  });
});
