"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";

export async function publishPostAndView(page) {
    // Publish the post
    await page.waitForTimeout(1500);
    await page.getByRole("button", { name: "Publish", exact: true }).click();
    await page.getByRole("button", { name: "Save", exact: true }).waitFor();
    await expect.soft(page.getByRole("button", { name: "Save", exact: true })).toBeVisible();

    
    await expect.soft(page.getByLabel("View Post")).toBeVisible();
    const page1Promise = page.waitForEvent("popup");
    await page.getByLabel("View Post").click();
    const page1 = await page1Promise;

    return page1;
}
