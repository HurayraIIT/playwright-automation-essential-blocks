"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";
import { publishPostAndView } from "../helpers/post-publish-helper";

test.describe("EB Toggle Content", () => {
  test("can insert a Toggle Content block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Toggle Content ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.TOGGLE_CONTENT });

    //checking block visibility in editor
    await expect.soft(page.getByLabel("Editor content").locator('span.eb-toggle-primary-label')).toBeVisible();
    await expect.soft(page.getByLabel("Editor content").locator('span.eb-toggle-secondary-label')).toBeVisible();

    // Publish the post
    const page1 = await publishPostAndView(page);

    //checking block visibility in post
    await expect.soft(page1.locator('h1:has-text("EB Toggle Content 2")')).toBeVisible();

    await expect.soft(page1.locator('span.eb-toggle-primary-label')).toBeVisible();
    await expect.soft(page1.locator('span.eb-toggle-secondary-label')).toBeVisible();
  });
});
