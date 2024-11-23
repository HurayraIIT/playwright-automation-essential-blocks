"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";

test.describe("EB Advanced Tabs", () => {
  test("can insert an Advanced Tabs block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Advanced Tabs ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.ADVANCED_TABS });

    //checking block visibility in editor
    await expect(page.getByLabel("Editor content").getByText("Tab Title 1")).toBeVisible();
    await expect(page.getByLabel("Editor content").getByText("Tab Title 2")).toBeVisible();
    await expect(page.getByLabel("Editor content").getByText("Tab Title 3")).toBeVisible();

    // Publish the post
    await page.getByRole("button", { name: "Publish", exact: true }).click();
    await page.getByRole("button", { name: "Save", exact: true }).waitFor();
    await expect(page.getByRole("button", { name: "Save", exact: true })).toBeVisible();

    await expect(page.getByLabel("View Post")).toBeVisible();
    const page1Promise = page.waitForEvent("popup");
    await page.getByLabel("View Post").click();
    const page1 = await page1Promise;

    //checking block visibility in post
    await expect(page1.locator('h1:has-text("EB Advanced Tabs 2")')).toBeVisible();

    await expect(page1.getByText("Tab Title 1")).toBeVisible();
    await expect(page1.getByText("Tab Title 2")).toBeVisible();
    await expect(page1.getByText("Tab Title 3")).toBeVisible();
  });
});
