"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";
import { publishPostAndView } from "../helpers/post-publish-helper";

test.describe("EB Team Member", () => {
  test("can insert a Team Member block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Team Member ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.TEAM_MEMBER });

    //start with blank
    await expect.soft(page.getByRole("button", { name: "Start Blank", exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Start Blank" }).click()


    //checking block visibility in editor
    await expect.soft(page.getByLabel("Editor content").getByText("John Doe")).toBeVisible();
    await expect.soft(page.getByLabel("Editor content").getByText("Software Engineer")).toBeVisible();

    // Publish the post
    const page1 = await publishPostAndView(page);

    //checking block visibility in post
    await expect.soft(page1.locator('h1:has-text("EB Team Member 2")')).toBeVisible();

    await expect.soft(page1.getByText("John Doe")).toBeVisible();
    await expect.soft(page1.getByText("Software Engineer")).toBeVisible();
  });
});
