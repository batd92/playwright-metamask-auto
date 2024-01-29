import { type Locator, type Page } from '@playwright/test';
import { readFileSync, writeFileSync, readFilesInDirectory } from '../helpers/file';
import path from 'path';
require('dotenv').config();

export class MMISignUpPage {
    readonly page: Page;
    readonly extensionId: string;
    readonly getStartedBtn: Locator;
    readonly importWalletBtn: Locator;
    readonly confirmSecretBtn: Locator;
    readonly agreeBtn: Locator;
    readonly noThanksBtn: Locator;
    readonly passwordTxt: Locator;
    readonly passwordConfirmTxt: Locator;
    readonly agreeCheck: Locator;
    readonly agreeTandCCheck: Locator;
    readonly agreePasswordTermsCheck: Locator;
    readonly importBtn: Locator;
    readonly doneBtn: Locator;
    readonly gotItBtn: Locator;
    readonly nextBtn: Locator;
    readonly createOnboardingWallet: Locator;
    readonly createWallet: Locator;
    readonly btnSecure: Locator;
    readonly btnRecoveryPhrase: Locator;
    readonly btnCopyToClipboard: Locator;
    readonly btnRecoveryPhraseNext: Locator;
    readonly btnRecoveryPhraseInput2: Locator;
    readonly btnRecoveryPhraseInput3: Locator;
    readonly btnRecoveryPhraseInput7: Locator;
    readonly btnRecoveryPhraseConfirm: Locator;
    readonly btnPopoverClose: Locator;
    readonly btnCopyAddress: Locator;
    readonly btnImportWallet: Locator;
    readonly mainMenuBtn: Locator;

    constructor(page: Page, extensionId: string) {
        this.page = page;
        this.extensionId = extensionId;
        this.getStartedBtn = page.locator('button:has-text("Get started")');
        this.importWalletBtn = page.locator(
            'button:has-text("Import an existing wallet")',
        );
        this.confirmSecretBtn = page.locator(
            'button:has-text("Confirm Secret Recovery Phrase")',
        );
        this.agreeBtn = page.locator('button:has-text("I agree")');
        this.noThanksBtn = page.locator('button:has-text("No thanks")');
        this.passwordTxt = page.getByTestId('create-password-new');
        this.passwordConfirmTxt = page.getByTestId('create-password-confirm');
        this.agreeCheck = page.getByTestId('create-new-vault__terms-checkbox');
        this.agreeTandCCheck = page.getByTestId('onboarding-terms-checkbox');
        this.agreePasswordTermsCheck = page.getByTestId('create-password-terms');
        this.importBtn = page.locator('button:has-text("Import my wallet")');
        this.doneBtn = page.locator('button:has-text("Done")');
        this.gotItBtn = page.locator('button:has-text("Got it!")');
        this.nextBtn = page.locator('button:has-text("Next")');
        this.createOnboardingWallet = page.getByTestId('onboarding-create-wallet');
        this.createWallet = page.getByTestId('create-password-wallet');
        this.createWallet = page.getByTestId('create-password-wallet');

        // secure
        this.btnSecure = page.getByTestId('secure-wallet-recommended');
        this.btnRecoveryPhrase = page.getByTestId('recovery-phrase-reveal');
        this.btnCopyToClipboard = page.getByText('Copy to clipboard');
        this.btnRecoveryPhraseNext = page.getByTestId('recovery-phrase-next');

        this.btnRecoveryPhraseInput2 = page.getByTestId('recovery-phrase-input-2');
        this.btnRecoveryPhraseInput3 = page.getByTestId('recovery-phrase-input-3');
        this.btnRecoveryPhraseInput7 = page.getByTestId('recovery-phrase-input-7');

        this.btnRecoveryPhraseConfirm = page.getByTestId('recovery-phrase-confirm');
        this.btnPopoverClose = page.getByTestId('popover-close');
        this.btnCopyAddress = page.getByTestId('address-copy-button-text');
    }

    async goto() {
        await this.page.goto(`chrome-extension://${this.extensionId}/home.html`);
    }

    /**
     * Export
     */
    async signUp() {
        await this.start();
        await this.makePassword();
        const phrase = await this.makePhrase();
        await this.done();
        await this.save(phrase);
    }

    /**
     * Import
     */
    async signIn(data: any) {
        await this.import(data);
    }

    async import(data: any) {
        if (data) {
            await this.startImport();

            const seeds = data.phrases;
            for (const [index, element] of (seeds as string[]).entries()) {
                await this.page
                    .locator(`data-testid=import-srp__srp-word-${index}`)
                    .fill(element);
            }
            await this.confirmSecretBtn.click();

            await this.password();
            await this.importBtn.click();
            await this.done();
        }
    }

    async close() {
        await this.page.close();
    }

    private async start() {
        await this.agreeTandCCheck.click();
    }

    private async startImport() {
        await this.agreeTandCCheck.click();
        await this.importWalletBtn.click();
        await this.agreeBtn.click();
    }

    private async makePassword() {
        await this.createOnboardingWallet.click();
        await this.agreeBtn.click();
        await this.password();
        await this.createWallet.click();
    }

    private async makePhrase(): Promise<string[]> {
        await this.btnSecure.click();
        await this.btnRecoveryPhrase.click();
        await this.btnCopyToClipboard.click();

        // https://github.com/LavaMoat/LavaMoat/pull/360
        const recoveryPhrase = await this.page.evaluate(() => navigator.clipboard.readText());
        const phrases = recoveryPhrase.split(" ").filter(Boolean);

        await this.btnRecoveryPhraseNext.click();
        console.log('Phrase:', phrases);

        await this.phrase(phrases);
        return phrases;
    }

    private async save(phrases: string[]) {
        await this.btnCopyAddress.click();
        // https://github.com/LavaMoat/LavaMoat/pull/360
        const address = await this.page.evaluate(() => navigator.clipboard.readText());
        console.log('address wallet:', address);

        const pathFile = path.resolve(`src/storage/${address}.json`);
        await writeFileSync(pathFile, JSON.stringify({
            address,
            phrases
        }));
    }

    private async password() {
        await this.passwordTxt.fill(process.env.PASSWORD || 'Luckyboy@1' as string);
        await this.passwordConfirmTxt.fill(
            process.env.PASSWORD || 'Luckyboy@1' as string,
        );
        await this.agreePasswordTermsCheck.click();
    }

    private async phrase(phrases: string[]) {
        await this.btnRecoveryPhraseInput2.fill(phrases[2]);
        await this.btnRecoveryPhraseInput3.fill(phrases[3]);
        await this.btnRecoveryPhraseInput7.fill(phrases[7]);

        await this.btnRecoveryPhraseConfirm.click();
    }

    private async done() {
        await this.gotItBtn.click();
        await this.nextBtn.click();
        await this.doneBtn.click();
        await this.btnPopoverClose.click();
    }

    async end() {
        await this.page.getByRole('button', { name: /continue/iu }).click();
        await this.page
          .getByRole('button', {
            name: /continue metamask institutional onboarding/iu,
          })
          .click();
      }
}
