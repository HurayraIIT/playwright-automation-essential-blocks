"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";
import { publishPostAndView } from "../helpers/post-publish-helper";


test.describe.skip("EB Fluent Forms", () => {
  test("can insert a Fluent Forms block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Fluent Forms ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.FLUENT_FORMS });

    // Insert content
    await expect.soft(page.getByLabel("Editor content").getByRole("heading", { name: "Fluent Forms" })).toBeVisible();
    await expect
      .soft(
        page
          .getByLabel("Editor content")
          .getByText(
            "Fluent Form is not installed/activated on your site. Please install and activate Fluent Form first."
          )
      )
      .toBeVisible();
    await expect.soft(page.getByLabel("Editor content").getByRole("link", { name: "Fluent Form" })).toBeVisible();

    // Check visibility in the editor

    // Publish the post
    const page1 = await publishPostAndView(page);


    // Check frontend visibility
  });
});
