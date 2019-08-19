import { Selector, ClientFunction } from 'testcafe';
import * as moment from 'moment';
import StegSelectors from './stegSelectors';
import { config } from '../../config';
import LoginPage from '../pages/LoginPage';

const loginPage = new LoginPage();

const waitForInitialDataLoaded = ClientFunction(() => {
    return new Promise((resolve) => {
        window.setInterval(() => {
            if (document.location.pathname !== '/') {
                resolve();
            }
        }, 100);
    });
});

const getPath = ClientFunction(() => document.location.pathname);

const getHost = ClientFunction(() => document.location.host);

const avbrytSøknad = async (t: TestController) => {
    await t.click(StegSelectors.avbrytSøknadLenke);
    await Selector('.bekreftDialog__bekreftKnapp');
    await t.click('.bekreftDialog__bekreftKnapp');
    await t.expect(getPath()).eql('/velkommen');
};

const selectRadio = async (t: TestController, name: string, value: string | number) => {
    const rbLabel = await StegSelectors.radioPanelElement(name, value).parent('label');
    await t.click(rbLabel);
};

const selectCheckbox = async (t: TestController, value: string | number, name?: string) => {
    const rbLabel = await StegSelectors.checkboxPanelElement(value, name).parent('label');
    await t.click(rbLabel);
};

const selectDropdown = async (t: TestController, dropdown: Selector, value: string) => {
    const option = dropdown.find(`option[value="${value}"]`);

    await t.click(dropdown);
    await t.click(option);
};

const selectRangeValue = async (t: TestController, rangeContainer: Selector, verdi: number) => {
    const rangeInput = await rangeContainer.find('input');
    const currentValue = parseInt(await rangeInput.value);

    if (currentValue === verdi) {
        return;
    }

    const increaseButton = await rangeContainer.find('.rangeInput__stepper--next').find('button');
    const decreaseButton = await rangeContainer.find('.rangeInput__stepper--previous').find('button');

    const sign = currentValue < verdi ? +1 : -1;
    const absoluteDifference = (verdi - currentValue) * sign;

    for (let i = absoluteDifference; i > 0; i--) {
        sign > 0 ? await t.click(increaseButton) : await t.click(decreaseButton);
    }
};

const setDato = async (t: TestController, input: Selector, dato: Date) => {
    await t.typeText(input, dato ? moment(dato).format('DD.MM.YYYY') : '').pressKey('tab');
};

const gåVidere = async (t: TestController) => {
    await t.click(StegSelectors.fortsettKnapp);
};

const getRadioPanelGruppe = (navn: string) => {
    return StegSelectors.radioPanelGruppe(navn);
};

const dateToString = (date: Date): string => moment(date).format('DD.MM.YYYY');

const skipWeekend = (date: Date) => {
    const dayOfWeek = moment(date).isoWeekday();

    return dayOfWeek === 6 || dayOfWeek === 7
        ? moment(date)
              .add(dayOfWeek === 6 ? 2 : 1, 'days')
              .toDate()
        : date;
};

const rewindToBeforeWeekend = (date: Date) => {
    const dayOfWeek = moment(date).isoWeekday();

    return dayOfWeek === 6 || dayOfWeek === 7
        ? moment(date)
              .subtract(dayOfWeek === 6 ? 1 : 2, 'days')
              .toDate()
        : date;
};

const setParent = async (t: TestController, fnr: string) => {
    if (config.skipLogin) {
        return;
    }

    await t.useRole(loginPage.login(fnr));
    const host = await TestUtils.getHost();

    if (host && host.indexOf('login.microsoftonline.com') >= 0) {
        await t.useRole(loginPage.login(fnr));
    }
};

const startAndResetSøknad = async (t: TestController, cnt: number) => {
    await t.navigateTo(config.url);

    const host = await TestUtils.getHost();
    if (host && host.indexOf('login.microsoftonline.com') >= 0) {
        await t.useRole(loginPage.login(config.fnr_default_mor));
    }

    await TestUtils.waitForInitialDataLoaded();
    await t.wait(1000); // Wait for redirect if user has temporary storage
    const path: string = await TestUtils.getPath();
    if (path.indexOf('soknad') >= 0) {
        await TestUtils.avbrytSøknad(t);
    } else if (path.indexOf('velkommen') === -1) {
        if (cnt < 3) {
            await startAndResetSøknad(t, cnt++);
        }
    }
};

const ventPåKvittering = async (t: TestController) => {
    await t.expect(Selector('.søknadSendt').exists).eql(true);
};

const TestUtils = {
    dateToString,
    avbrytSøknad,
    getPath,
    getHost,
    getRadioPanelGruppe,
    gåVidere,
    selectRadio,
    selectDropdown,
    selectRangeValue,
    skipWeekend,
    rewindToBeforeWeekend,
    setDato,
    setParent,
    startAndResetSøknad,
    waitForInitialDataLoaded,
    ventPåKvittering,
    selectCheckbox
};

export default TestUtils;
