"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";

test.describe("EB Accordion", () => {
  test("can insert an accordion block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Accordion ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.ACCORDION });

    await expect.soft(page.getByRole("button", { name: "Start Blank", exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Start Blank" }).click();

    await expect(page.getByText("What Destinations Do You Offer?")).toBeVisible();
    await expect(page.getByText("How Can I Book a Trip?")).toBeVisible();
    await expect(page.getByText("What’s Included in Your Packages?")).toBeVisible();

    // Publish the post
    await page.getByRole("button", { name: "Publish", exact: true }).click();
    await page.getByRole("button", { name: "Save", exact: true }).waitFor();
    await expect.soft(page.getByRole("button", { name: "Save", exact: true })).toBeVisible();

    await expect.soft(page.getByLabel("View Post")).toBeVisible();
    const page1Promise = page.waitForEvent("popup");
    await page.getByLabel("View Post").click();
    const page1 = await page1Promise;

    //checking block visibility in post
    await expect.soft(page1.locator('h1:has-text("EB Accordion 2")')).toBeVisible();

    await expect(page1.getByText("What Destinations Do You Offer?")).toBeVisible();
    await expect(page1.getByText("How Can I Book a Trip?")).toBeVisible();
    await expect(page1.getByText("What’s Included in Your Packages?")).toBeVisible();
  });
});
