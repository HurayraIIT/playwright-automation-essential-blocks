"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks, EB_PRO_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";
import { publishPostAndView } from "../helpers/post-publish-helper";


test.describe("EB Google Maps", () => {
  test("can insert a Google Maps block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Google Maps ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.GOOGLE_MAP });

    // Insert content
    await expect.soft(page.getByLabel("Editor content").getByRole("heading", { name: "Google Maps" })).toBeVisible();
    await expect.soft(
      page.getByLabel("Editor content").getByText("Please add your Google Map API Here to display Google Maps Block")
    ).toBeVisible();
    await expect.soft(page.getByLabel("Editor content").getByRole("link", { name: "Here" })).toHaveAttribute(
      "href",
      /wp-admin\/admin\.php\?page=essential-blocks&tab=options/
    );
    await expect.soft(
      page.getByLabel("Editor content").getByRole("link", { name: "Learn more about Google Map API" })
    ).toHaveAttribute("href", "https://essential-blocks.com/docs/retrieve-google-maps-api");

    // Check visibility in the editor

    // Publish the post
    const page1 = await publishPostAndView(page);


    // Check frontend visibility
    await expect.soft(page1.getByText("Please add your Google Map API to display Google Maps Block")).toBeVisible();
  });
});
