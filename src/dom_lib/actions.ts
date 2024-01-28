import { WebDriver, By, until } from 'selenium-webdriver';
import Elements from './elements';
import { TByOptions } from './locator';

class DLActions {
    static async clickElement(driver: WebDriver, selector: string, by?: TByOptions) {
        try {
            const element = await Elements.findElement(driver, selector, by);
            if (element) {
                await driver.wait(until.elementIsVisible(element), 10000);
                await element.click();
            }
        } catch (error) {
            console.error(`Error clicking element '${selector}':`, error.message);
        }
    }

    static async getElement(driver: WebDriver, selector: string, by?: TByOptions) {
        try {
            return await Elements.findElement(driver, selector, by);
        } catch (error) {
            console.error(`Error getting element '${selector}':`, error.message);
            return undefined;
        }
    }

    static async isEnabled(driver: WebDriver, selector: string, by?: TByOptions) {
        try {
            const element = await Elements.findElement(driver, selector, by);
            if (element) {
                await driver.wait(until.elementIsVisible(element), 10000);
                return element.isEnabled();
            }
            return false;
        } catch (error) {
            console.error(`Error checking element '${selector}' isEnabled:`, error.message);
            return false;
        }
    }

    static async isDisplayed(driver: WebDriver, selector: string, by?: TByOptions) {
        try {
            return await Elements.findElementAndCheckDisplay(driver, selector, by);
        } catch (error) {
            console.error(`Error checking element '${selector}' isDisplayed:`, error.message);
            return false;
        }
    }

    static async fillText(driver: WebDriver, selector: string, text: string, by?: TByOptions) {
        try {
            const element = await Elements.findElement(driver, selector, by);
            if (element) {
                await driver.wait(until.elementIsVisible(element), 10000);
                await element.clear();
                await element.sendKeys(text);
            }
        } catch (error) {
            console.error(`Error filling text in element '${selector}':`, error.message);
        }
    }

    static async getElementByXpath(driver: WebDriver, selector: string) {
        try {
            return await Elements.findElement(driver, selector);
        } catch (error) {
            console.error(`Error getting element '${selector}':`, error.message);
            return undefined;
        }
    }
}

export default DLActions;