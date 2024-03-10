import path from 'path';
import { test as base, chromium } from '@playwright/test';
import { getUAs } from '../helpers/fake-user-agent';
require('dotenv').config();

const extensionPath = path.join(__dirname, '../../../../extensions/11.7.3_0');

export const test = base.extend({
    context: async ({ }, use) => {
        const launchOptions = {
            headless: false,
            args: [
                `--disable-extensions-except=${extensionPath}`,
                `--load-extension=${extensionPath}`,
                //`--proxy-server=${fakeIP}`,
                `--user-agent=${getUAs()}`,
                ],
        };
        if (process.env.HEADLESS === 'true') {
            launchOptions.args.push('--headless=new');
        }
        const context = await chromium.launchPersistentContext('', launchOptions);
        await use(context);
        await context.close();
    },
});
