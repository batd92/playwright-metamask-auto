import { test } from '../helpers/extension-loader';
import { ChromeExtensionPage } from '../service/mmi-extension-page';
import { MMIMainMenuPage } from '../service/mmi-mainMenu-page';
import { MMINetworkPage } from '../service/mmi-network-page';
import { MMISignUpPage } from '../service/mmi-signup-page';

test.describe('Sign up', () => {
  test('new wallet', async ({ page, context }) => {
    // Getting extension id of MMI
    const extensions = new ChromeExtensionPage(await context.newPage());

    await extensions.goto();
    await extensions.setDevMode();
    const extensionId = await extensions.getExtensionId();
    await extensions.close();

    const signUp = new MMISignUpPage(
      await context.newPage(),
      extensionId as string,
    );

    await signUp.goto();
    await signUp.signUp();
    await signUp.close();

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
    await networkPage.selectNetwork('Goerli');
  });
});
