"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";

test.describe("EB Buttons", () => {
  test.beforeEach(async ({ admin }) => {
    await admin.createNewPost({ postType: "post", title: `EB Button ${generateTimestamp()}` });
  });

  test("can insert a button block", async ({ editor, page }) => {
    await editor.insertBlock({ name: EB_Free_Blocks.BUTTON });

    // Type the URL
    await page.keyboard.type("click test");

    // Wait for the search result to show up and select it
    await page.getByPlaceholder("Paste URL or type to search").fill("click test");
    await page.getByRole("option", { name: "Click Test" }).waitFor();
    await expect(page.getByRole("option", { name: "Click Test" })).toBeVisible();

    await page.getByRole("option", { name: "Click Test" }).click();
    await page.waitForTimeout(1000);

    await expect(page.getByPlaceholder("Paste URL or type to search")).toHaveValue(/click-test/);
    await expect(page.getByRole("textbox", { name: "URL" })).toHaveValue(/click-test/);

    // Select Button Type: Success
    await page.getByLabel("Type").selectOption("success");

    // Fill Button text
    await page.getByLabel("Button Text").fill("Click me 240930!");

    // save the page and view it in the frontend
    await page.getByRole("button", { name: "Publish", exact: true }).click();
    await page.getByRole("button", { name: "Save", exact: true }).waitFor();
    await expect(page.getByRole("button", { name: "Save", exact: true })).toBeVisible();

    const page1Promise = page.waitForEvent("popup");
    await page.getByLabel("View Post").click();
    const page1 = await page1Promise;
    await expect(page1.getByRole("link", { name: "Click me 240930!" })).toBeVisible();

    await page1.getByRole("link", { name: "Click me 240930!" }).click();
    await expect(page1.getByText("I have appeared!")).toBeVisible();
  });
});
