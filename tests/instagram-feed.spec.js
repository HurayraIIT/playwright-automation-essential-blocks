"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks, EB_PRO_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";
import { publishPostAndView } from "../helpers/post-publish-helper";

test.describe("EB Instagram Feed", () => {
  test("can insert an Instagram Feed block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Instagram Feed ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.INSTAGRAM_FEED });
    await page.waitForTimeout(1000);

    // Insert content

    // Check visibility in the editor
    await expect.soft(page.getByText('To get started please add an Instagram Access Token here.')).toBeVisible();
    await expect.soft(page.getByRole("link", { name: "here.(opens in a new tab)" })).toHaveAttribute(
      "href",
      /wp-admin\/admin\.php\?page=essential-blocks&tab=options/
    );

    // Publish the post
    const page1 = await publishPostAndView(page);


    // Check frontend visibility
  });
});
