"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";
import { publishPostAndView } from "../helpers/post-publish-helper";

test.describe("EB Advanced Navigation", () => {
  test("can insert an Advanced Navigation block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Advanced Navigation ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.ADVANCED_NAVIGATION });

    //checking block visibility in editor
    //await expect.soft(page.getByText("Click Test")).toBeVisible();

    // Publish the post
    const page1 = await publishPostAndView(page);

    //checking block visibility in post
    await expect.soft(page.getByText("Click Test")).toBeVisible();
    await expect.soft(page1.getByText("EB Advanced Navigation 2")).toBeVisible();
  });
});
