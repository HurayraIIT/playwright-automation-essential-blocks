"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";
import { publishPostAndView } from "../helpers/post-publish-helper";

test.describe("EB Notice", () => {
  test("can insert a Notice block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Notice ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.NOTICE });

    //checking block visibility in editor
    await expect.soft(page.getByLabel("Editor content").getByText("Save 20%")).toBeVisible();
    await expect.soft(page.getByLabel("Editor content").getByText("Free shipping on all orders")).toBeVisible();

    // Publish the post
    const page1 = await publishPostAndView(page);

    //checking block visibility in post
    await expect.soft(page1.locator('h1:has-text("EB Notice 2")')).toBeVisible();

    await expect.soft(page1.getByText("Save 20%")).toBeVisible();
    await expect.soft(page1.getByText("Free shipping on all orders")).toBeVisible();
  });
});
