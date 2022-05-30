import { Locator, Page } from "@playwright/test";
import { LoginPageModel } from "./LoginPageModel";

export class LoginPage {
  public readonly page: Page;
  public readonly logInButton: Locator;
  public readonly usernameInput: Locator;
  public readonly passwordInput: Locator;
  public readonly pageHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logInButton = page.locator(LoginPageModel.LOGIN_BUTTON);
    this.usernameInput = page.locator(LoginPageModel.USERNAME_INPUT);
    this.passwordInput = page.locator(LoginPageModel.PASSWORD_INPUT);
    this.pageHeader = page.locator(LoginPageModel.PAGE_HEADER);
  }

  public async enterCredentials(username: string, password: string): Promise<void> {
    await this.usernameInput.type(username);
    await this.passwordInput.type(password);
  }

  public async open(url: string = ''): Promise<void> {
    await this.page.goto(url, { waitUntil: "load" });
  }

  public async submit(): Promise<void> {
    await this.logInButton.click();
  }

}