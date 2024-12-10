"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";
import { publishPostAndView } from "../helpers/post-publish-helper";

test.describe("EB Countdown", () => {
  test("can insert a Countdown block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Countdown ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.COUNTDOWN });

    //checking block visibility in editor
    await expect.soft(page.getByRole("button", { name: "Start Blank", exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Start Blank" }).click();
    await expect.soft(page.getByLabel("Editor content").getByText("Days")).toBeVisible();
    await expect.soft(page.getByLabel("Editor content").getByText("Hours")).toBeVisible();
    await expect.soft(page.getByLabel("Editor content").getByText("Minutes")).toBeVisible();
    await expect.soft(page.getByLabel("Editor content").getByText("Seconds")).toBeVisible();

    // Publish the post
    const page1 = await publishPostAndView(page);

    //checking block visibility in post
    await expect.soft(page1.locator('h1:has-text("EB Countdown 2")')).toBeVisible();

    await expect.soft(page1.getByText("Days")).toBeVisible();
    await expect.soft(page1.getByText("Hours")).toBeVisible();
    await expect.soft(page1.getByText("Minutes")).toBeVisible();
    await expect.soft(page1.getByText("Seconds")).toBeVisible();
  });
});
