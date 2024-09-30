import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  await page.goto('https://eb-automation.qa1.site/wp-login.php?redirect_to=https%3A%2F%2Feb-automation.qa1.site%2Fwp-admin%2Fpost.php%3Fpost%3D108%26action%3Dedit&reauth=1');
  await page.getByLabel('Username or Email Address').fill('hurayra');
  await page.getByLabel('Username or Email Address').press('Tab');
  await page.getByLabel('Password', { exact: true }).fill('LogMeInPleaseWPDev');
  await page.getByText('Remember Me').click();
  await page.goto('https://eb-automation.qa1.site/wp-login.php?redirect_to=https%3A%2F%2Feb-automation.qa1.site%2Fwp-admin%2Fpost.php%3Fpost%3D108%26action%3Dedit&reauth=1');
  await page.goto('https://eb-automation.qa1.site/wp-admin/post.php?post=108&action=edit');
  await expect(page.getByRole('button', { name: 'Save', exact: true })).toBeVisible();
  await expect(page.getByLabel('View Post')).toBeVisible();
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await expect(page.getByTestId('snackbar')).toBeVisible();
  await page.getByTestId('snackbar').click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByLabel('View Post').click();
  const page1 = await page1Promise;
  await expect(page1.getByRole('link', { name: 'Click Me!' })).toBeVisible();
});