"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
// import { clickIfAriaExpandedIsFalse } from '../helpers/buttonUtils';
import generateTimestamp from "../helpers/generator";
import { publishPostAndView } from "../helpers/post-publish-helper";

test.describe("EB Advanced Heading", () => {
  test("can insert an Advanced Heading block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Advanced Heading ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.ADVANCED_HEADING });

    //opening setting tab in editor
    // const button = page.locator('xpath=//*[@id="editor"]/div/div[1]/div[1]/div[1]/div/div[3]/div[2]/button[2]');;
    // await clickIfAriaExpandedIsFalse(button);
    await editor.openDocumentSettingsSidebar();

    await expect.soft(page.getByText("Essential Blocks Advanced Heading")).toBeVisible();
    await expect.soft(page.getByRole("heading", { name: "Advanced Heading", exact: true })).toBeVisible();
    await expect.soft(page.getByText("Create advanced heading with")).toBeVisible();

    await page.getByRole("tab", { name: "General" }).click();
    await expect.soft(page.getByRole("button", { name: "General" })).toBeVisible();
    await expect.soft(page.getByLabel("General").getByText("Source")).toBeVisible();
    await expect.soft(page.getByText("Preset Designs")).toBeVisible();

    // Set title level to h4
    await expect.soft(page.getByText("Title Level")).toBeVisible();
    await page.getByRole("button", { name: "H4" }).click();

    // Set title text
    await expect.soft(page.getByText("Title Text")).toBeVisible();
    await page.getByLabel("Title Text").click();
    await page.getByLabel("Title Text").press("ControlOrMeta+a");
    await page.getByLabel("Title Text").fill("EA Advanced Heading Test 20240930");

    // Publish the post
    const page1 = await publishPostAndView(page);
    await expect.soft(page1.getByRole("heading", { name: "EA Advanced Heading Test 20240930" })).toBeVisible();
    await page1.getByRole("heading", { name: "EA Advanced Heading Test 20240930" }).click();
  });
});
