"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";

test.describe("EB InfoBox", () => {
  test("can insert an InfoBox block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB InfoBox ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.INFOBOX });

    //checking block visibility in editor
    await expect.soft(page.getByLabel("Editor content").getByText("This is an info box")).toBeVisible();
    await expect.soft(
      page
        .getByLabel("Editor content")
        .getByText("Write a short description, that will describe the title or something informational and useful")
    ).toBeVisible();

    // Publish the post
    await page.getByRole("button", { name: "Publish", exact: true }).click();
    await page.getByRole("button", { name: "Save", exact: true }).waitFor();
    await expect.soft(page.getByRole("button", { name: "Save", exact: true })).toBeVisible();

    await expect.soft(page.getByLabel("View Post")).toBeVisible();
    const page1Promise = page.waitForEvent("popup");
    await page.getByLabel("View Post").click();
    const page1 = await page1Promise;

    //checking block visibility in post
    await expect.soft(page1.locator('h1:has-text("EB InfoBox 2")')).toBeVisible();
    await expect.soft(page1.getByText("This is an info box")).toBeVisible();
  });
});
