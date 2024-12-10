"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";
import { publishPostAndView } from "../helpers/post-publish-helper";


test.describe("EB Advanced Tabs", () => {
  test("can insert an Advanced Tabs block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Advanced Tabs ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.ADVANCED_TABS });

    await page.getByLabel("Editor content").getByText("Tab Title 1").fill(`First Tab Title ${generateTimestamp()}`);
    await page.getByRole("button", { name: "Add block" }).click();
    await page.getByRole("option", { name: "Paragraph" }).click();
    await page.getByLabel("Empty block; start writing or").fill(`First tab content ${generateTimestamp()}`);

    const page1 = await publishPostAndView(page);


    await expect.soft(page1.getByRole("heading", { name: /First Tab Title/ })).toBeVisible();
    await expect.soft(page1.getByText(/First tab content/)).toBeVisible();
  });
});
