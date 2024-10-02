//"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";

test.describe("EB Dual Button", () => {
  test("can insert a Dual Button block", async ({ admin, editor, page }) => {
    await admin.createNewPost();
    await editor.insertBlock({ name: EB_Free_Blocks.DUAL_BUTTON });

    await page.getByLabel("Preset Designs").selectOption("preset-4");

    await page.locator("#eb-button-group-alignment").getByRole("button", { name: "" }).click();

    await page.getByLabel("Button One Text").fill("Button One 241001");
    await page.getByLabel("Button Two Text").fill("Button Two 241001");

    await page.getByLabel("Show Connector?").check();

    await editor.openPreviewPage();
  });
});
