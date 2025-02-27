"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";
import { publishPostAndView } from "../helpers/post-publish-helper";

test.describe("EB Pricing Table", () => {
  test("can insert a Pricing Table block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Pricing Table ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.PRICING_TABLE });

    //checking block visibility in editor
    await expect.soft(page.getByRole("button", { name: "Start Blank", exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Start Blank" }).click();
    await expect.soft(page.getByLabel("Editor content").getByText("Startup")).toBeVisible();
    await expect.soft(page.getByLabel("Editor content").getByText("$99/ month")).toBeVisible();
    await expect.soft(page.getByLabel("Editor content").getByText("Unlimited Calls")).toBeVisible();
    await expect.soft(page.getByLabel("Editor content").getByText("Free Hosting")).toBeVisible();
    await expect.soft(page.getByLabel("Editor content").getByText("500MB Free Storage")).toBeVisible();
    await expect.soft(page.getByLabel("Editor content").getByText("24/7 Support")).toBeVisible();

    // Publish the post
    const page1 = await publishPostAndView(page);

    //checking block visibility in post
    await expect.soft(page1.locator('h1:has-text("EB Pricing Table 2")')).toBeVisible();

    await expect.soft(page1.getByText("Startup")).toBeVisible();
    await expect.soft(page1.getByText("$99/ month")).toBeVisible();
    await expect.soft(page1.getByText("Unlimited Calls")).toBeVisible();
    await expect.soft(page1.getByText("Free Hosting")).toBeVisible();
    await expect.soft(page1.getByText("500MB Free Storage")).toBeVisible();
    await expect.soft(page1.getByText("24/7 Support")).toBeVisible();

    await page1.close();
  });
});
