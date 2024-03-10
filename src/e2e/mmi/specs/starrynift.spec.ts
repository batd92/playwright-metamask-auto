import { test } from '../helpers/extension-loader';
import { ChromeExtensionPage } from '../service/mmi-extension-page';
import { MMIMainMenuPage } from '../service/mmi-mainMenu-page';
import { MMINetworkPage } from '../service/mmi-network-page';
import { MMISignUpPage } from '../service/mmi-signup-page';
import { StarryNiftPage } from '../service/mmi-starrynift-page';
import { readFilesInDirectory, readFileSync } from '../helpers/file';
import { sleep } from '../helpers/utils';

test.describe('sign in and connect dapp', () => {
    const files = readFilesInDirectory().slice(0, Number.parseInt(process.env?.RUN_WALLET || '1'));
    for (const file of files) {
        const data = readFileSync(file);
        test(`[starrynift.art] _ ${data.address[0]}`, async ({ page, context }) => {
            try {
                await signInAndConnectDapp(page, context, data);   
            } catch (error) {
                console.log('Error : ', error);
            } finally {
                await logoutMMI();
            }
        });
    }
});

const logoutMMI = async () => {

}

// connecting Dapp
const signInAndConnectDapp = async (page: any, context: any, data: any) => {
    const extensions = new ChromeExtensionPage(await context.newPage());
    await extensions.goto();
    await extensions.setDevMode();
    const extensionId = await extensions.getExtensionId();
    await extensions.close();
    await sleep();

    const signIn = new MMISignUpPage(
        await context.newPage(),
        extensionId as string,
    );

    await sleep();
    await signIn.goto();
    await signIn.signIn(data);
    await signIn.close();
    await sleep();
    
    const mainMenuPage = new MMIMainMenuPage(page, extensionId as string);
    await mainMenuPage.goto();
    await mainMenuPage.selectMenuOption('settings');
    await mainMenuPage.selectSettings('Advance');
    await mainMenuPage.switchTestNetwork();
    await mainMenuPage.closeSettings();

    const networkPage = new MMINetworkPage(page);
    await networkPage.open();
    await networkPage.addBNBChain();

    const starryNiftPage = new StarryNiftPage(page);

    await starryNiftPage.gotoReferralCode();
    await starryNiftPage.connect();
    await sleep(2000);
    await starryNiftPage.connectMMByReferralCode(context);
    await sleep(1000);
    await starryNiftPage.operateOnTheWeb(data);
    await sleep(1000);
};

