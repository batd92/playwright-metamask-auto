import { test } from '../helpers/extension-loader';
import { ChromeExtensionPage } from '../service/mmi-extension-page';
import { MMIMainMenuPage } from '../service/mmi-mainMenu-page';
import { MMINetworkPage } from '../service/mmi-network-page';
import { MMISignUpPage } from '../service/mmi-signup-page';
import { readFilesInDirectory, readFileSync } from '../helpers/file';

test.describe('Sign In', () => {

    const files = readFilesInDirectory();
    for (let index = 0; index < files.length; index++) {
        const data = readFileSync(files[index]);
        test(`import wallet ${data.address}`, async ({ page, context }) => {
            // Getting extension id of MMI
            const extensions = new ChromeExtensionPage(await context.newPage());

            await extensions.goto();
            await extensions.setDevMode();
            const extensionId = await extensions.getExtensionId();
            await extensions.close();

            const signIn = new MMISignUpPage(
                await context.newPage(),
                extensionId as string,
            );


            await signIn.goto();
            await signIn.signIn(data);
            await signIn.close();

            // Setup testnetwork in settings
            const mainMenuPage = new MMIMainMenuPage(page, extensionId as string);
            await mainMenuPage.goto();
            await mainMenuPage.selectMenuOption('settings');
            await mainMenuPage.selectSettings('Advance');
            await mainMenuPage.switchTestNetwork();
            await mainMenuPage.closeSettings();

            // Check network
            const networkPage = new MMINetworkPage(page);
            await networkPage.open();
            await networkPage.selectNetworkBNBChain();
        });
    }
});
