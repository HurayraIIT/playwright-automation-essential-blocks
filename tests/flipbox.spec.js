"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";

test.describe("EB FlipBox", () => {
  test("can insert a FlipBox block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB FlipBox ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.FLIPBOX });

    //checking block visibility in editor
    await expect(page.getByLabel("Editor content").getByText("Front Title Here")).toBeVisible();
    await expect(page.getByLabel("Editor content").getByText("Front Content Here")).toBeVisible();
    await page.getByLabel("Editor content").getByText("Front Content Here").hover();
    await expect(page.getByLabel("Editor content").getByText("Back Title Here")).toBeVisible();
    await expect(page.getByLabel("Editor content").getByText("Back Content Here")).toBeVisible();

    // Publish the post
    await page.getByRole("button", { name: "Publish", exact: true }).click();
    await page.getByRole("button", { name: "Save", exact: true }).waitFor();
    await expect(page.getByRole("button", { name: "Save", exact: true })).toBeVisible();

    await expect(page.getByLabel("View Post")).toBeVisible();
    const page1Promise = page.waitForEvent("popup");
    await page.getByLabel("View Post").click();
    const page1 = await page1Promise;

    //checking block visibility in post
    await expect(page1.locator('h1:has-text("EB FlipBox 2")')).toBeVisible();

    await expect(page1.getByText("Front Title Here")).toBeVisible();
    await expect(page1.getByText("Front Content Here")).toBeVisible();
    await page1.getByText("Front Content Here").hover();
    await expect(page1.getByText("Back Title Here")).toBeVisible();
    await expect(page1.getByText("Back Content Here")).toBeVisible();
  });
});
