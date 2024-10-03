"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks, EB_PRO_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";

test.describe("Block Insert Test", () => {
  test.beforeEach(async ({ admin }) => {
    await admin.createNewPost({ title: `EB ${generateTimestamp()}` });
  });

  test("Accordion Block", async ({ editor, page }) => {
    await editor.insertBlock({ name: EB_Free_Blocks.ACCORDION });

    await expect(page.getByText("Accordion title 1")).toBeVisible();
    await expect(page.getByText("Accordion title 2")).toBeVisible();
    await expect(page.getByText("Accordion title 3")).toBeVisible();

    await expect(page.getByRole("heading", { name: "Accordion", exact: true })).toBeVisible();
    await expect(page.getByText("Display your FAQs & improve")).toBeVisible();
    await expect(page.getByRole("tab", { name: "General" })).toBeVisible();
    await expect(page.getByText("Title Level")).toBeVisible();
    await expect(page.getByText("Toggle Speed")).toBeVisible();
    await expect(page.getByText("Enable FAQ Schema")).toBeVisible();

    const previewPage = await editor.openPreviewPage();
    await previewPage.waitForTimeout(3000);

    await expect(previewPage.getByRole("button", { name: "Accordion title 1" })).toBeVisible();
  });

  test("Advanced Heading Block", async ({ editor, page }) => {
    await editor.insertBlock({ name: EB_Free_Blocks.ADVANCED_HEADING });

    await expect(page.getByText("Essential Blocks Advanced Heading")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Advanced Heading", exact: true })).toBeVisible();
    await expect(page.getByText("Create advanced heading with")).toBeVisible();

    await page.getByRole("tab", { name: "General" }).click();
    await expect(page.getByRole("button", { name: "General" })).toBeVisible();
    await expect(page.getByLabel("General").getByText("Source")).toBeVisible();
    await expect(page.getByText("Preset Designs")).toBeVisible();
    await expect(page.getByText("Alignment")).toBeVisible();
    await expect(page.getByText("Title Level")).toBeVisible();

    // Set title text
    await expect(page.getByText("Title Text")).toBeVisible();
    await page.getByLabel("Title Text").click();
    await page.getByLabel("Title Text").press("ControlOrMeta+a");
    await page.getByLabel("Title Text").fill("EA Advanced Heading Test 20240930");

    const previewPage = await editor.openPreviewPage();
    await previewPage.waitForTimeout(3000);
    await expect(previewPage.getByRole("heading", { name: "EA Advanced Heading Test 20240930" })).toBeVisible();
  });

  test("Advanced Search block", async ({ editor, page }) => {
    await editor.insertBlock({ name: EB_PRO_Blocks.ADVANCED_SEARCH });

    await expect(page.getByLabel("Block: Advanced Search").locator("form")).toBeVisible();
    await expect(page.getByPlaceholder("Search")).toBeVisible();
    await expect(page.getByRole("button", { name: "Search", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Advanced Search", exact: true })).toBeVisible();
    await expect(page.getByText("Let visitors find any content")).toBeVisible();

    await expect(page.getByRole("tab", { name: "General" })).toBeVisible();
    await expect(page.getByRole("button", { name: "General" })).toBeVisible();
    await expect(page.getByText("Preset", { exact: true })).toBeVisible();

    // Check the frontend
    const previewPage = await editor.openPreviewPage();
    await previewPage.waitForTimeout(3000);

    await expect(previewPage.locator("#search-form-alt")).toBeVisible();
    await expect(previewPage.getByPlaceholder("Search ....", { exact: true })).toBeVisible();
    await expect(previewPage.getByRole("button", { name: "Search" })).toBeVisible();
  });

  test("Advanced Tabs block", async ({ editor, page }) => {
    await editor.insertBlock({ name: EB_Free_Blocks.ADVANCED_TABS });

    await page.getByLabel("Editor content").getByText("Tab Title 1").fill(`First Tab Title ${generateTimestamp()}`);
    await page.getByRole("button", { name: "Add block" }).click();
    await page.getByRole("option", { name: "Paragraph" }).click();
    await page.getByLabel("Empty block; start writing or").fill(`First tab content ${generateTimestamp()}`);

    const previewPage = await editor.openPreviewPage();
    await previewPage.waitForTimeout(3000);

    await expect(previewPage.getByRole("heading", { name: /First Tab Title/ })).toBeVisible();
    await expect(previewPage.getByText(/First tab content/)).toBeVisible();
  });

  test("Button block", async ({ editor, page }) => {
    await editor.insertBlock({ name: EB_Free_Blocks.BUTTON });

    await page.keyboard.type("https://example.com/");

    const previewPage = await editor.openPreviewPage();
    await previewPage.waitForTimeout(3000);

    await expect(previewPage.getByRole("link", { name: "Click Me!" })).toBeVisible();
    await expect(previewPage.getByRole("link", { name: "Click Me!" })).toHaveAttribute("href", "https://example.com/");
  });

  test("Dual Button block", async ({ editor, page }) => {
    await editor.insertBlock({ name: EB_Free_Blocks.DUAL_BUTTON });

    await page.getByLabel("Button One Text").fill("Button One 241001");
    await page.getByLabel("Button Two Text").fill("Button Two 241001");

    const previewPage = await editor.openPreviewPage();
    await previewPage.waitForTimeout(3000);

    await expect(previewPage.getByRole("link", { name: "Button One 241001" })).toBeVisible();
    await expect(previewPage.getByRole("link", { name: "Button Two 241001" })).toBeVisible();
  });
});
