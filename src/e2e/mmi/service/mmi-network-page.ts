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

    readonly BNBChain: Locator;
    readonly OP_BNBChain: Locator;

    // network manually
    readonly loadNetwork: Locator;
    readonly btnAddNetwordManually: Locator;
    readonly name: Locator;
    readonly rpc: Locator;
    readonly chainId: Locator;
    readonly symbol: Locator;
    readonly explorer: Locator;
    readonly save: Locator;
    readonly approve: Locator;
    readonly switchNetwork: Locator;
    readonly done: Locator;

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

        // index network
        this.BNBChain = page.locator(`//*[@id="popover-content"]/div/div/section/div[2]/div/button[1]/h6`);
        this.OP_BNBChain = page.locator(`//*[@id="popover-content"]/div/div/section/div[2]/div/button[1]/h6`);

        this.doneBtn = page.locator(`//*[@id="popover-content"]/div/div/section/div[3]/button`);

        // Add network manually
        this.loadNetwork = page.locator('//*[@id="app-content"]/div/div[2]/div/div[1]/button');
        this.btnAddNetwordManually = page.getByTestId('add-network-manually');
        this.name = page.locator('//*[@id="app-content"]/div/div[3]/div/div[2]/div[2]/div/div[2]/div/div[2]/div[1]/label/input');
        this.rpc = page.locator('//*[@id="app-content"]/div/div[3]/div/div[2]/div[2]/div/div[2]/div/div[2]/div[2]/label/input');
        this.chainId = page.locator('//*[@id="app-content"]/div/div[3]/div/div[2]/div[2]/div/div[2]/div/div[2]/div[3]/label/input');
        this.symbol = page.locator('//*[@id="app-content"]/div/div[3]/div/div[2]/div[2]/div/div[2]/div/div[2]/div[4]/div/input');
        this.explorer = page.locator('//*[@id="app-content"]/div/div[3]/div/div[2]/div[2]/div/div[2]/div/div[2]/div[5]/label/input');
        this.save = page.locator('//*[@id="app-content"]/div/div[3]/div/div[2]/div[2]/div/div[2]/div/div[3]/button[2]');
        this.approve = page.getByTestId('confirmation-submit-button')
        this.switchNetwork = page.locator('//*[@id="popover-content"]/div/div/section/div[2]/div/button[1]/h6');
        this.done = page.locator('//*[@id="popover-content"]/div[2]/div/section/div[3]/button');
        
    }


    async open() {
        await this.networkBtn.click();
    }

    async showTestnet() {
        await this.showHideBtn.click();
        await this.showHideSettingToggle.click();
        await this.closeSettingsBtn.click();
    }

    async addBNBChain() {
        await this.addNetworkBtn.click();
        await this.addBtn.click();
        await this.submitBtn.click();
        await this.BNBChain.click();
        await this.doneBtn.click();
    }

    async addNetwork(networkOptions) {
        if (networkOptions) {
            //await this.loadNetwork.click();
            await this.addNetworkBtn.click();
            await this.btnAddNetwordManually.click();
    
            await this.name.fill(networkOptions.name);
            await this.rpc.fill(networkOptions.rpc);
            await this.chainId.fill(networkOptions.chainId);
            await this.symbol.fill(networkOptions.symbol);
            await this.explorer.fill(networkOptions.explorer);

            await this.save.click();
            //await this.switchNetwork.click();
            
            await this.done.click();
        }
    }


    async close() {
        await this.page.close();
    }
}
