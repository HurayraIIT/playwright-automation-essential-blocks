"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";

test.describe("EB Advanced Tabs", () => {
  test("can insert an Advanced Tabs block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Advanced Tabs ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.ADVANCED_TABS });

    await page.getByLabel("Editor content").getByText("Tab Title 1").fill(`First Tab Title ${generateTimestamp()}`);
    await page.getByRole("button", { name: "Add block" }).click();
    await page.getByRole("option", { name: "Paragraph" }).click();
    await page.getByLabel("Empty block; start writing or").fill(`First tab content ${generateTimestamp()}`);

    await page.getByRole("button", { name: "Publish", exact: true }).click();
    await page.getByRole("button", { name: "Save", exact: true }).waitFor();
    await expect(page.getByRole("button", { name: "Save", exact: true })).toBeVisible();

    const page1Promise = page.waitForEvent("popup");
    await page.getByLabel("View Post").click();
    const page1 = await page1Promise;

    await expect(page1.getByRole("heading", { name: /First Tab Title/ })).toBeVisible();
    await expect(page1.getByText(/First tab content/)).toBeVisible();
  });
});
