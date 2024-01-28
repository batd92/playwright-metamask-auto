import { By } from 'selenium-webdriver';
import { Options as ChromeOptions } from 'selenium-webdriver/chrome';
import { Options as FirefoxOptions } from 'selenium-webdriver/firefox';
import { Options as EdgeOptions } from 'selenium-webdriver/edge';
import { Options as IeOptions } from 'selenium-webdriver/ie';

export enum BrowsersEnum {
  Chrome = 'chrome',
  Firefox = 'firefox',
  Edge = 'edge',
  Ie = 'ie',
}

export type BrowsersOptions = ChromeOptions | FirefoxOptions | EdgeOptions | IeOptions;
export type TByOptions = (selector: string) => By;
