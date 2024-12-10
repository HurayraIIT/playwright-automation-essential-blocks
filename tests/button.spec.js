"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";
import { publishPostAndView } from "../helpers/post-publish-helper";


test.describe("EB Button", () => {
  test("can insert a Button block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Button ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.BUTTON });

    // Insert content
    await page.keyboard.type("https://example.com");
    await page.keyboard.press("Enter");
    await page.getByLabel("Add Text..").fill("Click me 241124!");
    await page.waitForTimeout(500);

    // Check visibility in the editor

    // Publish the post
    const page1 = await publishPostAndView(page);


    // Check frontend visibility
    await expect.soft(page1.getByRole("link", { name: "Click me 241124!" })).toBeVisible();
    await expect.soft(page1.locator("a.eb-button-anchor")).toHaveAttribute("href", /https:\/\/example\.com/);
  });
});
