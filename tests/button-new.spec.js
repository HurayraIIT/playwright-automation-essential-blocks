"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";

test.describe("EB Buttons", () => {
  test.beforeEach(async ({ admin }) => {
    await admin.createNewPost({ postType: "post", title: "EB Buttons" });
  });

  test.afterAll(async ({ requestUtils }) => {
    await requestUtils.deleteAllPosts();
  });

  test("can insert a button block", async ({ editor, page }) => {
    test.slow();
    await editor.insertBlock({ name: EB_Free_Blocks.BUTTON });
    await page.getByLabel("Button Text").fill("Salam");
    await page.getByRole("textbox", { name: "URL" }).fill("https://examplexxx123.com");


    const previewPage = await editor.openPreviewPage();
    await previewPage.locator(".wp-block-essential-blocks-button").waitFor();

    await expect(previewPage.locator(".wp-block-essential-blocks-button")).toHaveText("Salam");
    await expect(previewPage.getByRole("link", { name: "Salam" })).toHaveAttribute(
      "href",
      /https:\/\/examplexxx123.com/
    );
  });
});
