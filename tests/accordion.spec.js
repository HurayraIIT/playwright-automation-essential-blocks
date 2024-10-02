"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";

test.describe("EB Accordion", () => {
  test("can insert an accordion block", async ({ admin,editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Accordion ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.ACCORDION });

    await expect(page.getByText("Accordion title 1")).toBeVisible();
    await expect(page.getByText("Accordion title 2")).toBeVisible();
    await expect(page.getByText("Accordion title 3")).toBeVisible();

    await expect(page.getByRole("heading", { name: "Accordion", exact: true })).toBeVisible();
    await expect(page.getByText("Display your FAQs & improve")).toBeVisible();

    await expect(page.getByRole("tab", { name: "General" })).toBeVisible();

    await expect(page.getByText("Title Level")).toBeVisible();
    await expect(page.getByRole("button", { name: "H2" })).toBeVisible();
    // await page.getByRole("button", { name: "H2" }).click();

    await expect(page.getByText("Toggle Speed")).toBeVisible();
    // await page.getByRole("slider", { name: "Toggle Speed" }).fill("2.3");

    await expect(page.getByText("Enable FAQ Schema")).toBeVisible();
    // await page.getByLabel("Enable FAQ Schema").check();

    await page.getByRole("button", { name: "Publish", exact: true }).click();
    const page1Promise = page.waitForEvent("popup");
    await page.getByLabel("View Post").click();
    const page1 = await page1Promise;
    await expect(page1.getByRole("button", { name: " Accordion title 1" })).toBeVisible();
    await page1.getByRole("button", { name: " Accordion title 1" }).click();
  });
});
