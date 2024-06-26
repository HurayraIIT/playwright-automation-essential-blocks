"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";

test("demo test", async ({ page, admin, editor }) => {
  await admin.visitAdminPage("/");
  await admin.createNewPost();
  // insert block named essential-blocks/accordion
  await editor.insertBlock({ name: "essential-blocks/accordion" });
  await editor.publishPost();
  const content = await editor.getEditedPostContent();
  console.log(content);
});
