import { request } from "@playwright/test";
import { RequestUtils } from "@wordpress/e2e-test-utils-playwright";

// https://playwright.dev/docs/test-global-setup-teardown#configure-globalsetup-and-globalteardown
export default async function globalSetup() {
  const requestContext = await request.newContext({
    baseURL: process.env.WP_BASE_URL,
  });
  const requestUtils = new RequestUtils(requestContext, {
    storageStatePath: process.env.WP_AUTH_STORAGE,
    user: {
      username: process.env.WP_USERNAME,
      password: process.env.WP_PASSWORD,
    },
  });

  // https://playwright.dev/docs/test-global-setup-teardown#example
  await requestUtils.setupRest();
  await requestContext.dispose();
}
