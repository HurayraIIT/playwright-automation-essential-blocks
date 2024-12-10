"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";
import { publishPostAndView } from "../helpers/post-publish-helper";

test.describe("EB Breadcrumbs", () => {
  test("can insert a Breadcrumbs block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Breadcrumbs ${generateTimestamp()}` });
    await editor.insertBlock({ name: "essential-blocks/breadcrumbs" });

    //checking block visibility in editor
    await expect.soft(page.getByText("Dummy Parent")).toBeVisible();
    await expect.soft(page.getByText("Dummy Title")).toBeVisible();

    // Publish the post
    const page1 = await publishPostAndView(page);

    //checking block visibility in post
    await expect.soft(page1.locator("div.eb-breadcrumb").getByText("EB Breadcrumbs 2")).toBeVisible();
  });
});
