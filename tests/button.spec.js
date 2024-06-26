"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";

test.describe("EB Buttons", () => {
  test.beforeEach(async ({ admin }) => {
    await admin.createNewPost({ post_type: "post", post_title: "EB Buttons" });
  });

  test.afterAll(async ({ requestUtils }) => {
    await requestUtils.deleteAllPosts();
  });

  test("can insert a button block", async ({ editor, page }) => {
    test.slow();
    await editor.insertBlock({ name: EB_Free_Blocks.BUTTON });

    // Select Button Type: Success
    await page.getByLabel("Type").selectOption("success");
    // Fill Button text
    await page.getByLabel("Button Text").fill("Salam");
    // Fill URL
    await page.getByRole("textbox", { name: "URL" }).fill("https://examplexxx123.com");
    // Toggle Open in New Tab
    await page.getByLabel("Open in New Tab").check();
    // Toggle Add nofollow
    await page.getByLabel("Add nofollow").check();
    // Alignment Left
    await page.getByRole("button", { name: "" }).click();
    // Width Full
    await page.getByRole("button", { name: "Full" }).click();
    // Expand Icon Section
    await page.getByRole("button", { name: "Icon" }).click();
    // Toggle Icon on
    await page.getByLabel("Add icon").check();
    // Icon position right
    await page.getByRole("button", { name: "" }).nth(1).click();
    // Icon Size 51
    await page.locator("#inspector-range-control-0").fill("51");
    // Icon Gap 21
    await page.locator("#inspector-range-control-1").fill("21");

    const previewPage = await editor.openPreviewPage();
    await expect(previewPage.locator(".wp-block-essential-blocks-button")).toHaveText("Salam");
    await expect(previewPage.getByRole("link", { name: "Salam" })).toHaveAttribute(
      "href",
      /https:\/\/examplexxx123.com/
    );
  });
});
