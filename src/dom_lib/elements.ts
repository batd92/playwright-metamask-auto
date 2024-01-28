import { WebDriver, By, until } from 'selenium-webdriver';

import { TByOptions } from './locator';

class Elements {
    static async findElement(driver: WebDriver, selector: string, by: TByOptions = By.xpath) {
        return await driver.findElement(by(selector));
    }

    static async findElementAndCheckDisplay(driver: WebDriver, selector: string, by: TByOptions = By.xpath) {
        try {
            const element = await Elements.findElement(driver, selector, by);
            return await element.isDisplayed();
        } catch (e) {
            return false;
        }
    }
}
export default Elements;
