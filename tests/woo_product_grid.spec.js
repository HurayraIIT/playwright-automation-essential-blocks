// "use strict";
// import { test, expect } from "@wordpress/e2e-test-utils-playwright";
// import { EB_Free_Blocks } from "../helpers/block-names";
// import generateTimestamp from "../helpers/generator";
// import { publishPostAndView } from "../helpers/post-publish-helper";

// test.describe("EB Woo Product Grid", () => {
//   test("can insert a Woo Product Grid block", async ({ admin, editor, page }) => {
//     await admin.createNewPost({ postType: "post", title: `EB Woo Product Grid ${generateTimestamp()}` });
//     await editor.insertBlock({ name: EB_Free_Blocks.WOO_PRODUCT_GRID });

//     await expect.soft(page.getByRole("button", { name: "Start Blank", exact: true })).toBeVisible();
//     await page.getByRole("button", { name: "Start Blank" }).click();
    
//     //checking block visibility in editor
//     await expect(page.getByLabel('Editor content')).toMatchAriaSnapshot(`
//       - 'document "Block: Woo Product Grid"':
//         - link:
//           - img
//         - heading "WordPress Pennant" [level=3]
//         - paragraph: /\\d+\\.\\d+৳/
//         - link:
//           - img
//         - heading "Logo Collection" [level=3]
//         - paragraph: /\\d+\\.\\d+৳ – \\d+\\.\\d+৳/
//         - link:
//           - img
//         - heading "Beanie with Logo" [level=3]
//         - paragraph: "/Original price was: \\\\d+\\\\.\\\\d+৳ \\\\. Current price is: \\\\d+\\\\.\\\\d+৳ \\\\./"
//         - link:
//           - img
//         - heading "T-Shirt with Logo" [level=3]
//         - paragraph: /\\d+\\.\\d+৳/
//       `);

//     // Publish the post
//     const page1 = await publishPostAndView(page);

//     //checking block visibility in post
//     await expect.soft(page1.locator('h1:has-text("EB Woo Product Grid 2")')).toBeVisible();

//     await expect(page1.locator('#wp--skip-link--target')).toMatchAriaSnapshot(`
//       - link
//       - text:     
//       - heading "WordPress Pennant" [level=3]:
//         - link "WordPress Pennant"
//       - paragraph: /\\d+\\.\\d+৳/
//       - link
//       - text: sale     
//       - heading "Logo Collection" [level=3]:
//         - link "Logo Collection"
//       - paragraph: /\\d+\\.\\d+৳ – \\d+\\.\\d+৳/
//       - link
//       - text: sale     
//       - heading "Beanie with Logo" [level=3]:
//         - link "Beanie with Logo"
//       - paragraph: "/Original price was: \\\\d+\\\\.\\\\d+৳ \\\\. Current price is: \\\\d+\\\\.\\\\d+৳ \\\\./"
//       - link
//       - text:     
//       - heading "T-Shirt with Logo" [level=3]:
//         - link "T-Shirt with Logo"
//       - paragraph: /\\d+\\.\\d+৳/
//       `);
//   });
// });
