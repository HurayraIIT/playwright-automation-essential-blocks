"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks, EB_PRO_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";
import { time } from "console";

test.describe("EB Form", () => {
  test("can insert a Form block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Form ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.FORM });

    // Insert content
    await expect.soft(page.getByRole("heading", { name: "Please Select a Form Type" })).toBeVisible();
    await expect.soft(page.locator("div").filter({ hasText: /^Contact Form$/ })).toBeVisible();
    await expect.soft(page.locator("div").filter({ hasText: /^Subscription Form$/ })).toBeVisible();
    await expect.soft(page.locator("div").filter({ hasText: /^RSVP Form$/ })).toBeVisible();
    await expect.soft(page.locator("div").filter({ hasText: /^Blank$/ })).toBeVisible();
    await page
      .locator("div.eb-form-editor-formtype-item")
      .filter({ hasText: /^Contact Form$/ })
      .click();
    //adding notification type from control panel
    // Check visibility in the editor
    const timestamp = Date.now();

    await page.getByLabel('Form Title').fill(String(timestamp));

    var response_type = page.getByLabel('Notification Type');
    await response_type.selectOption('save');


    await expect.soft(page.getByPlaceholder('Enter your first name here...')).toBeVisible();
    await expect.soft(page.getByPlaceholder('Enter your last name here...')).toBeVisible();
    await expect.soft(page.getByPlaceholder('Enter your subject here...')).toBeVisible();
    await expect.soft(page.getByPlaceholder('Enter your email here...')).toBeVisible();
    await expect.soft(page.getByPlaceholder('Enter your message here...')).toBeVisible();
    
    await page.getByLabel('Document Overview').click();
    await page.getByLabel('Add block').click();
    await page.getByPlaceholder('Search').fill("number field");
    await page.getByRole('option', { name: 'Number Field' }).click();
    await expect.soft(page.getByPlaceholder('Enter your number here...')).toBeVisible();

    await page.getByRole('link', { name: 'Form', exact: true }).click();
    await page.getByLabel('Add block').click();
    await page.getByPlaceholder('Search').fill("select field");
    await page.getByRole('option', { name: 'Select Field' }).click();
    await expect.soft(page.locator('#undefined')).toBeVisible();

    await page.getByRole('link', { name: 'Form', exact: true }).click();
    await page.getByLabel('Add block').click();
    await page.getByPlaceholder('Search').fill("checkbox-Field");
    await page.getByRole('option', { name: 'Checkbox Field' }).click();
    await expect.soft(page.getByText('Field Title *Option 1Option')).toBeVisible();

    
    await page.getByRole('link', { name: 'Form', exact: true }).click();
    await page.getByLabel('Add block').click();
    await page.getByPlaceholder('Search').fill("Radio Field");
    await page.getByRole('option', { name: 'Radio Field' }).click();
    await expect.soft(page.getByLabel('Block: Radio Field').getByText('Field Title *Option 1Option')).toBeVisible();

    // Publish the post
    await page.getByRole("button", { name: "Publish", exact: true }).click();
    await page.getByRole("button", { name: "Save", exact: true }).waitFor();
    await expect.soft(page.getByRole("button", { name: "Save", exact: true })).toBeVisible();

    // Open the post frontend
    await expect.soft(page.getByLabel("View Post")).toBeVisible();
    const page1Promise = page.waitForEvent("popup");
    await page.getByLabel("View Post").click();
    const page1 = await page1Promise;

    // Check frontend visibility
    await expect.soft(page1.getByPlaceholder('Enter your first name here...')).toBeVisible();
    await page1.getByPlaceholder('Enter your first name here...').fill("ismail");

    await expect.soft(page1.getByPlaceholder('Enter your last name here...')).toBeVisible();
    await page1.getByPlaceholder('Enter your last name here...').fill("hossain");

    await expect.soft(page1.getByPlaceholder('Enter your subject here...')).toBeVisible();
    await page1.getByPlaceholder('Enter your subject here...').fill("sqa");

    await page1.waitForTimeout(500);
    await expect.soft(page1.getByPlaceholder('Enter your email here...')).toBeVisible();
    await page1.getByPlaceholder('Enter your email here...').fill("sqa@gmail.com");
    
    await expect.soft(page1.getByPlaceholder('Enter your message here...')).toBeVisible();
    await page1.getByPlaceholder('Enter your message here...').fill("test massage");

    await expect.soft(page1.getByPlaceholder('Enter your number here...')).toBeVisible();
    await page1.getByPlaceholder('Enter your number here...').fill("01628242157");

    var checkbox_1 = page1.getByRole('combobox');
    await checkbox_1.selectOption('option_3');
    
    await page1.getByRole('checkbox', { name: 'Option 3' }) .click();
    await page1.getByRole('radio', { name: 'Option 3' }).click();
    await page1.getByRole('button', { name: 'Submit' }).click();
    await page1.waitForTimeout(2000);
    await expect.soft(page1.locator('div.eb_form_submit_response.show.success')).toHaveText("Your form has been submitted Successfully!");

    //validating the data on backend

    await page1.getByRole('menuitem', { name: 'About WordPress' }).click();
    await page1.waitForTimeout(1000);

    const collapseButton = page1.locator('button#collapse-button');
    await collapseButton.waitFor();

    const isExpanded = await collapseButton.getAttribute('aria-expanded');
    if (isExpanded === 'false') {
        await collapseButton.click();
    }

    await page1.locator("xpath=//div[normalize-space()='Essential Blocks']").hover();
    await page1.getByText("Form Responses").click();

    await page1.locator('#select-form-list').click();
    await page1.locator('#select-form-list').selectOption(String(timestamp));



    await expect.soft(page1.getByText('ismail').first()).toBeVisible();
    await expect.soft(page1.getByText('hossain').first()).toBeVisible();
    await expect.soft(page1.getByText('sqa').first()).toBeVisible();
    await expect.soft(page1.getByText('sqa@gmail.com').first()).toBeVisible();    
    await expect.soft(page1.getByText('test massage').first()).toBeVisible();
//due to pending issue additional block data are not adding in form response, please update if fixed.
  });
});
