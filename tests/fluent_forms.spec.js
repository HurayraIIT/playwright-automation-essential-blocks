"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";

test.describe("EB Fluent Form", () => {
  test("can insert a Fluent Form block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Fluent Form ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.FLUENT_FORMS });

    //checking block visibility in editor
    await expect.soft(await page.locator('#inspector-select-control-0')).toBeVisible();
    await page.locator('#inspector-select-control-0').selectOption("1");
    
    await page.waitForTimeout(2000);
    await expect.soft(await page.getByPlaceholder('First Name')).toBeVisible();
    await expect.soft(await page.getByPlaceholder('Last Name')).toBeVisible();
    await expect.soft(await page.getByPlaceholder('Email Address')).toBeVisible();
    await expect.soft(await page.getByPlaceholder('Subject')).toBeVisible();
    await expect.soft(await page.getByPlaceholder('Your Message')).toBeVisible();
    await expect.soft(await page.getByRole('button', { name: 'Submit Form' })).toBeVisible();

    
    // Publish the post
    await page.getByRole("button", { name: "Publish", exact: true }).click();
    await page.getByRole("button", { name: "Save", exact: true }).waitFor();
    await expect.soft(page.getByRole("button", { name: "Save", exact: true })).toBeVisible();

    await expect.soft(page.getByLabel("View Post")).toBeVisible();
    const page1Promise = page.waitForEvent("popup");
    await page.getByLabel("View Post").click();
    const page1 = await page1Promise;

    //checking block visibility in post
    await expect.soft(page1.locator('h1:has-text("EB Fluent Form 2")')).toBeVisible();
    await expect.soft(await page1.getByPlaceholder('First Name')).toBeVisible();
    await expect.soft(await page1.getByPlaceholder('Last Name')).toBeVisible();
    await expect.soft(await page1.getByPlaceholder('Email Address')).toBeVisible();
    await expect.soft(await page1.getByPlaceholder('Subject')).toBeVisible();
    await expect.soft(await page1.getByPlaceholder('Your Message')).toBeVisible();
  });
});
