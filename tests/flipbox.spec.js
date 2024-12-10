"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";
import { publishPostAndView } from "../helpers/post-publish-helper";

test.describe("EB FlipBox", () => {
  test("can insert a FlipBox block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB FlipBox ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.FLIPBOX });

    //checking block visibility in editor
    await expect.soft(page.getByLabel("Editor content").getByText("Front Title Here")).toBeVisible();
    await expect.soft(page.getByLabel("Editor content").getByText("Front Content Here")).toBeVisible();
    await page.getByLabel("Editor content").getByText("Front Content Here").hover();
    await expect.soft(page.getByLabel("Editor content").getByText("Back Title Here")).toBeVisible();
    await expect.soft(page.getByLabel("Editor content").getByText("Back Content Here")).toBeVisible();

    // Publish the post
    const page1 = await publishPostAndView(page);

    //checking block visibility in post
    await expect.soft(page1.locator('h1:has-text("EB FlipBox 2")')).toBeVisible();

    await expect.soft(page1.getByText("Front Title Here")).toBeVisible();
    await expect.soft(page1.getByText("Front Content Here")).toBeVisible();
    await page1.getByText("Front Content Here").hover();
    await expect.soft(page1.getByText("Back Title Here")).toBeVisible();
    await expect.soft(page1.getByText("Back Content Here")).toBeVisible();
  });
});
