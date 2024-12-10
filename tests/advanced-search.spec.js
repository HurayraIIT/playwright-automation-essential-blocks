"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_PRO_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";
import { publishPostAndView } from "../helpers/post-publish-helper";


test.describe("EB Advanced Search", () => {
  test("can insert an Advanced Search block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Advanced Search ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_PRO_Blocks.ADVANCED_SEARCH });

    await expect.soft(page.getByLabel("Block: Advanced Search").locator("form")).toBeVisible();
    await expect.soft(page.getByPlaceholder("Search")).toBeVisible();
    await expect.soft(page.getByRole("button", { name: "Search", exact: true })).toBeVisible();
    await expect.soft(page.getByRole("heading", { name: "Advanced Search", exact: true })).toBeVisible();
    await expect.soft(page.getByText("Let visitors find any content")).toBeVisible();

    await expect.soft(page.getByRole("tab", { name: "General" })).toBeVisible();
    await expect.soft(page.getByRole("button", { name: "General" })).toBeVisible();

    // Select preset 2
    await expect.soft(page.getByText("Preset", { exact: true })).toBeVisible();
    await page.getByLabel("Preset").selectOption("preset-classic-2");
    // await page.waitForTimeout(500);

    // Select post type - page
    await page.getByLabel("Search for Post Types").selectOption("page");
    // await page.waitForTimeout(500);

    // Enable show total results
    await expect.soft(page.getByText("Show Filter By Taxonomy")).toBeVisible();
    await page.getByLabel("Show Filter By Taxonomy").check();
    await page.getByLabel("Show Filter By Taxonomy").uncheck();
    await expect.soft(page.getByText("Show Total Results")).toBeVisible();
    await page.getByLabel("Show Total Results").check();

    // Select button type - icon and text
    await expect.soft(page.getByRole("button", { name: "Button" })).toBeVisible();
    await page.getByRole("button", { name: "Button" }).click();
    await expect.soft(page.getByLabel("Type", { exact: true })).toBeVisible();
    await page.getByLabel("Type", { exact: true }).selectOption("btn-type-icon-text");
    await expect.soft(page.locator("label").filter({ hasText: /^Text$/ })).toBeVisible();
    await page.getByLabel("Text", { exact: true }).click();
    await page.getByLabel("Text", { exact: true }).fill("Search 241001");
    await expect.soft(page.getByText("Button Icon")).toBeVisible();

    // Save the post
    const page1 = await publishPostAndView(page);

    // Check the frontend

    await expect.soft(page1.locator("#search-form-alt")).toBeVisible();
    await expect.soft(page1.getByPlaceholder("Search ....", { exact: true })).toBeVisible();
    await expect.soft(page1.getByRole("button", { name: " Search 241001" })).toBeVisible();

    // await page1.getByPlaceholder("Search ....", { exact: true }).click();
    // await page1.getByPlaceholder("Search ....", { exact: true }).fill(`unique-str-${generateTimestamp()}`);
    // await page1.keyboard.press("A");

    // await page1.getByText("Total 0 Results").waitFor();
    // await expect.soft(page1.getByText("Total 0 Results")).toBeVisible();
    // await expect.soft(page1.getByText("No Record Found")).toBeVisible();
    // await expect.soft(page1.locator("#search-form-alt span i")).toBeVisible();
    // await page1.locator("#search-form-alt span i").click();
  });
});
