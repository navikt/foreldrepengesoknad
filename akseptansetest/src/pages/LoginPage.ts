import { Role, Selector, ClientFunction } from 'testcafe';
import { config } from '../../config';

export const waitForIDPortenOptionPage = ClientFunction(() => {
    return new Promise((resolve) => {
        window.setInterval(() => {
            if (document.location.href.indexOf('login.microsoftonline.com') >= 0) {
                resolve();
            }
        }, 100);
    });
});

class LoginPM {
    utenIdPortenButton: Selector;
    usernameField: Selector;
    passwordField: Selector;
    nextButton: Selector;
    signInButtonAzure: Selector;
    dontShowAgainChecker: Selector;
    noButton: Selector;
    fnrField: Selector;
    signInButtonB2C: Selector;

    constructor() {
        this.utenIdPortenButton = Selector('#StubExchange');
        this.usernameField = Selector('#i0116');
        this.passwordField = Selector('#i0118');
        this.nextButton = Selector('#idSIButton9');
        this.signInButtonAzure = Selector('#idSIButton9');
        this.dontShowAgainChecker = Selector('#KmsiCheckboxField');
        this.noButton = Selector('#idBtn_Back');
        this.fnrField = Selector('input[name="login"]');
        this.signInButtonB2C = Selector('.login');
    }

    login(fnr: string) {
        return Role(config.url, async (t) => {
            waitForIDPortenOptionPage();
            await t
                .click(this.utenIdPortenButton)
                .typeText(this.usernameField, config.user)
                .click(this.nextButton)
                .typeText(this.passwordField, config.pass)
                .click(this.signInButtonAzure)
                .click(this.dontShowAgainChecker)
                .click(this.noButton)
                .typeText(this.fnrField, fnr)
                .click(this.signInButtonB2C);
        });
    }
}

export default LoginPM;
