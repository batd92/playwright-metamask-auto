import { type BrowserContext, type Locator, type Page } from '@playwright/test';
import { writeFileSync } from '../helpers/file';
import { sleep, getSecond } from '../helpers/utils';

export class StarryNiftPage {
    readonly page: Page;
    readonly devModeToggle: Locator;

    // referralCode
    readonly connectWalletBtn: Locator;
    readonly metaMaskBtn: Locator;

    // space room
    readonly networkAddFormRoomSpace: Locator;
    readonly connectBtnFormRoomSpace: Locator;

    readonly signBtn: Locator;
    readonly nextBtn: Locator;
    readonly selectNetwork: Locator;

    // action
    readonly spaceRoomId: Locator;
    readonly you: Locator;
    readonly follow: Locator;
    readonly like: Locator;
    readonly query: Locator;
    readonly back: Locator;
    readonly imageClose: Locator;

    readonly getBtnById: (text: string) => Locator;

    readonly btnSpaceRoom: Locator;


    constructor(page: Page) {
        this.page = page;
        this.connectWalletBtn = page.locator('body > div:nth-child(4) > div > div.ant-modal-wrap.walletmodelWarp.ant-modal-centered > div > div.ant-modal-content > div > div > div > div._first_box_193h3_85 > div:nth-child(2) > div._wallet_name_193h3_159');
        this.metaMaskBtn = page.locator('body > div:nth-child(4) > div > div.ant-modal-wrap.walletmodelWarp.ant-modal-centered > div > div.ant-modal-content > div > div > div > div._first_box_193h3_85 > div:nth-child(1) > div._wallet_name_193h3_159');
        this.signBtn = page.getByTestId('page-container-footer-next');

        this.spaceRoomId = page.locator('//*[@id="layout"]/div[3]/div/div/div/div/div[2]/div[2]/div/div/div[2]/div/div[1]/div[1]');
        this.you = page.locator('//*[@id="rootApp"]/div[1]/div[1]/div[2]');
        this.follow = page.locator('//*[@id="rootApp"]/div[1]/div[1]/div[3]/div[3]/div[2]');
        this.like = page.locator('//*[@id="rootApp"]/div[1]/div[3]');
        this.query = page.locator('//*[@id="rootApp"]/div[1]/div[4]/div[1]/div/div/div[2]/div[2]/input');
        this.back = page.locator('//*[@id="rootApp"]/div[1]/div[1]/div[1]');
        this.imageClose = page.locator('//*[@id="rootApp"]/div[3]/div[2]/div/div[2]/div/div/img');
    }

    async gotoReferralCode() {
        await this.page.goto('https://app.starrynift.art/room/space/uCoWpMzFb1mT1tb9BdHetv', { waitUntil: "load" });
    }

    async connect() {
        await this.connectWalletBtn.click();

    }
    // sign wallet
    async connectMMByReferralCode(context: BrowserContext) {
        try {
            const [popup1] = await Promise.all([
                context.waitForEvent('page'),
                await this.metaMaskBtn.click()
            ]);
    
            await popup1.waitForLoadState();
            popup1.locator('.check-box__indeterminate');
            await popup1.getByTestId('page-container-footer-next').click();
            await popup1.locator('button:has-text("Connect")').click();
            await popup1.locator('//*[@id="app-content"]/div/div/div/div[4]/footer/button[2]').click();

            await popup1.getByTestId('page-container-footer-next').click();
            await popup1.close();   
        } catch (error) {
            console.log(error);
        }
    }

    async connectMM(context: BrowserContext) {
        try {
            const [popup1] = await Promise.all([
                context.waitForEvent('page'),
                await this.metaMaskBtn.click()
            ]);
    
            await popup1.waitForLoadState();
            popup1.locator('.check-box__indeterminate');
            await popup1.locator('button:has-text("Next")').click();
            await popup1.locator('button:has-text("Connect")').click();
            await popup1.locator('//*[@id="app-content"]/div/div/div/div[4]/footer/button[2]').click();

            await popup1.close();   
        } catch (error) {
            console.log(error);
        }
    }

    // action [follow, like, query]
    async operateOnTheWeb(data: any) {
        await this.page.keyboard.press('Escape');
        await this.query.fill('✅Everyone Follow me and visit my space I will follow back every some minuts and visit your space');
        sleep(500);
        await this.page.keyboard.press('Enter');
        await this.you.click();
        await this.follow.click();
        await this.like.click();
        await this.back.click();
        const contents = Object.assign(data, { dapps: [...(data?.dapps || []), 'starrynift.art'] })
        await this.save(data.address[0], contents);
        sleep(1100);
        console.log('Done !!!')
    }

    async getExtensionId(extensionName: string) {
        return await this.page.$eval(
            `div#card >> :scope:has-text("${extensionName}") >> #extension-id`,
            (el) => el.textContent?.substring(4),
        );
    }

    async close() {
        await this.page.close();
    }

    private async save(address: string, contents: any) {
        writeFileSync(address, JSON.stringify(contents), true);
    }
}
