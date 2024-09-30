"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";

test.describe("EB Buttons", () => {
  test.beforeEach(async ({ admin }) => {
    await admin.createNewPost({ postType: "post", title: "EB Buttons new" });
  });

  test("can insert a button block", async ({ editor, page }) => {
    test.slow();
    await editor.insertBlock({ name: EB_Free_Blocks.BUTTON });

    // Select Button Type: Success
    await page.getByLabel("Type").selectOption("warning");
    // Fill Button text
    await page.getByLabel("Button Text").fill("Salamaaaa");

    const previewPage = await editor.openPreviewPage();
    await previewPage.locator(".wp-block-essential-blocks-button").waitFor();

    await expect(previewPage.locator(".wp-block-essential-blocks-button")).toHaveText("Salamaaaa");
  });
});
