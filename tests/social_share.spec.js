"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";
import { publishPostAndView } from "../helpers/post-publish-helper";

test.describe("EB Social Share", () => {
  test("can insert an Social Share block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Social Share ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.SOCIAL_SHARE });

    //checking block visibility in editor

    await expect(page.locator('span.eb-social-share-text').getByText("Facebook")).toBeVisible();
    await expect(page.locator('span.eb-social-share-text').getByText("Twitter")).toBeVisible();
    await expect(page.locator('span.eb-social-share-text').getByText("Linkedin")).toBeVisible();
    await expect(page.locator('span.eb-social-share-text').getByText("whatsapp")).toBeVisible();


    // Publish the post
    const page1 = await publishPostAndView(page);


    //checking block visibility in post
    await expect(page1.locator('h1:has-text("EB Social Share 2")')).toBeVisible();

    await expect(page1.locator('span.eb-social-share-text').getByText("Facebook")).toBeVisible();
    await expect(page1.locator('span.eb-social-share-text').getByText("Twitter")).toBeVisible();
    await expect(page1.locator('span.eb-social-share-text').getByText("Linkedin")).toBeVisible();
    await expect(page1.locator('span.eb-social-share-text').getByText("whatsapp")).toBeVisible();
  });
});