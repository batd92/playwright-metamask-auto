import { type Locator, type Page } from '@playwright/test';

export class MMINetworkPage {
  readonly page: Page;

  readonly networkBtn: Locator;

  readonly showHideBtn: Locator;

  readonly showHideSettingToggle: Locator;

  readonly closeSettingsBtn: Locator;
  readonly addNetworkBtn: Locator;
  readonly addBtn: Locator;
  readonly submitBtn: Locator;
  readonly switchBNBChainBtn: Locator;
  readonly doneBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.networkBtn = page.locator('data-testid=network-display');
    this.showHideBtn = page.locator('a:has-text("Show/hide")');
    this.showHideSettingToggle = page.locator(
      '//div[@data-testid="advanced-setting-show-testnet-conversion"][2]//div[contains(@class, \'toggle-button\')]/div[1]',
    );
    this.closeSettingsBtn = page.locator('.settings-page__close-button');
    this.addNetworkBtn = page.locator('button:has-text("Add network")');
    this.addBtn = page.locator('//*[@id="app-content"]/div/div[3]/div/div[2]/div[2]/div/div[2]/div[3]/div[2]/button');
    this.submitBtn = page.locator('//*[@id="popover-content"]/div/div/section/div/div/div[2]/div/button[2]');
    this.switchBNBChainBtn = page.locator(`//*[@id="popover-content"]/div/div/section/div[2]/div/button[1]/h6`);
    this.doneBtn = page.locator(`//*[@id="popover-content"]/div/div/section/div[3]/button`);
  }
  

  async open() {
    await this.networkBtn.click();
  }

  async showTestnet() {
    await this.showHideBtn.click();
    await this.showHideSettingToggle.click();
    await this.closeSettingsBtn.click();
  }

  async selectNetworkBNBChain() {
    await this.addNetworkBtn.click();
    await this.addBtn.click();
    await this.submitBtn.click();
    await this.switchBNBChainBtn.click();
    await this.doneBtn.click();
  }
}
