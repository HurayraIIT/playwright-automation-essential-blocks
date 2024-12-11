// "use strict";
// import { test, expect } from "@wordpress/e2e-test-utils-playwright";
// import { EB_Free_Blocks } from "../helpers/block-names";
// import generateTimestamp from "../helpers/generator";
// import { publishPostAndView } from "../helpers/post-publish-helper";

// test.describe("EB Wp Forms", () => {
//   test("can insert a Wp Forms block", async ({ admin, editor, page }) => {
//     await admin.createNewPost({ postType: "post", title: `EB Wp Forms ${generateTimestamp()}` });
//     await editor.insertBlock({ name: EB_Free_Blocks.WPFORMS });

//     //checking block visibility in editor

// await page.locator('#inspector-select-control-0').selectOption('6165');
// await page.waitForTimeout(3000);
// await expect(page.locator('#wpforms-form-6165')).toMatchAriaSnapshot(`
//     - group:
//       - group "Name":
//         - textbox "First" [disabled]
//         - text: First
//         - textbox "Last" [disabled]
//         - text: Last
//       - text: Email
//       - textbox "Email" [disabled]
//       - text: Comment or Message
//       - textbox "Comment or Message" [disabled]
//       - button "Submit" [disabled]
//     `);
//     // Publish the post
//     const page1 = await publishPostAndView(page);

//     //checking block visibility in post
//     await expect.soft(page1.locator('h1:has-text("EB Wp Forms 2")')).toBeVisible();

//     await expect(page1.locator('#wp--skip-link--target')).toMatchAriaSnapshot(`
//       - group "Name":
//         - textbox "First"
//         - text: First
//         - textbox "Last"
//         - text: Last
//       - text: Email
//       - textbox "Email"
//       - text: Comment or Message
//       - textbox "Comment or Message"
//       - button "Submit"
//       `);

//   });
// });
