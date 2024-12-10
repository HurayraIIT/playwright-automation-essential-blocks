"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";
import { publishPostAndView } from "../helpers/post-publish-helper";

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
    const page1 = await publishPostAndView(page);

    //checking block visibility in post
    await expect.soft(page1.locator('h1:has-text("EB Accordion 2")')).toBeVisible();

    await expect(page1.getByText("What Destinations Do You Offer?")).toBeVisible();
    await expect(page1.getByText("How Can I Book a Trip?")).toBeVisible();
    await expect(page1.getByText("What’s Included in Your Packages?")).toBeVisible();
  });
});
