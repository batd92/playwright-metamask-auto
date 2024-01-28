import path from 'path';
import { test } from '../helpers/extension-loader';
import { ChromeExtensionPage } from '../modules/mmi-extension-page';
import { MMISignUpPage } from '../modules/mmi-signup-page';

import { chromium, BrowserContext } from 'playwright';
const pathToExtension = path.resolve('src/extensions/11.7.3_0');

async function _moduleRunMain() {
    try {
        // Tạo một ngữ cảnh trình duyệt mới bằng Playwright Chromium
        const context = await chromium.launchPersistentContext('', {
            headless: false,
            args: [
            `--disable-extensions-except=${pathToExtension}`,
            `--load-extension=${pathToExtension}`
            ]
        });
        await context.grantPermissions(["clipboard-read", "clipboard-write"]);
        
        const extension = new ChromeExtensionPage(await context.newPage());
        const extensionId = await extension.initExtension();

        const signUp = new MMISignUpPage(
            await context.newPage(),
            extensionId as string,
        );

        await signUp.goto();
        await signUp.start();
        await signUp.authentication();
        await signUp.info();
    

        
    } catch (error) {
        console.log(error);
    }
}

_moduleRunMain().then();
