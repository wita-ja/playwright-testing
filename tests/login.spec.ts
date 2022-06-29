import test, { expect } from "@playwright/test";
import { LoginPage } from "../pageObjects/loginPage/LoginPage";

let loginPage: LoginPage;
const credentials = [{ username: 'standard_user', password: 'secret_sauce', isValid: true }, { username: 'secret_sauce', password: 'standard_user', isValid: false }];

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open('https://www.saucedemo.com/');
  });

  for (const credential of credentials) {
    test(`Login with ${credential.isValid ? 'valid' : 'invalid'} credentials`, async () => {
      await loginPage.enterCredentials(credential.username, credential.password);
      await loginPage.submit();

      const expectedValue = credential === credentials[0] ? true : false;

      await loginPage.page.pause();
      expect(await loginPage.pageHeader.isHidden(), 'Login page logo still visible').toBe(expectedValue);
    });
  }
});
