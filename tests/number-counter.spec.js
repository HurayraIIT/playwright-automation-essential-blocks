"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";
import { publishPostAndView } from "../helpers/post-publish-helper";

test.describe("EB Number Counter", () => {
  test("can insert a Number Counter block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Number Counter ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.NUMBER_COUNTER });

    //checking block visibility in editor
    await expect.soft(page.getByLabel("Editor content").getByText("50,000+")).toBeVisible();
    await expect.soft(page.getByLabel("Editor content").getByText("Active Users")).toBeVisible();

    // Publish the post
    const page1 = await publishPostAndView(page);

    //checking block visibility in post
    await expect.soft(page1.locator('h1:has-text("EB Number Counter 2")')).toBeVisible();

    await expect.soft(page1.getByText("50,000+")).toBeVisible();
    await expect.soft(page1.getByText("Active Users")).toBeVisible();
  });
});
