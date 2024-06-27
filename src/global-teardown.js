import { request } from "@playwright/test";
import { RequestUtils } from "@wordpress/e2e-test-utils-playwright";

export default async function globalTeardown() {
  const requestContext = await request.newContext({
    baseURL: process.env.WP_BASE_URL,
  });
  const requestUtils = new RequestUtils(requestContext, {
    storageStatePath: process.env.WP_AUTH_STORAGE,
  });

  // https://playwright.dev/docs/test-global-setup-teardown#example
  await requestUtils.setupRest();
  await requestUtils.deleteAllPosts();
  await requestContext.dispose();

  console.log("Global teardown has been completed.");
}
