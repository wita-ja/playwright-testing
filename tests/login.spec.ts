import test, { expect } from "@playwright/test";
import { LoginPage } from "../pageObjects/loginPage/LoginPage";
import { Credential, credentials } from "../resources/credentials";

let loginPage: LoginPage;
let loginCredentials: Credential[] = credentials;

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open('https://www.saucedemo.com/');
  });

  for (const credential of loginCredentials) {
    test(`Login with ${credential.isValid ? 'valid' : 'invalid'} credentials`, async () => {
      await loginPage.enterCredentials(credential.username, credential.password);
      await loginPage.submit();

      const expectedValue = credential.isValid ? true : false;

      await loginPage.page.pause();
      expect(await loginPage.pageHeader.isHidden(), 'Login page logo still visible').toBe(expectedValue);
    });
  }
});
