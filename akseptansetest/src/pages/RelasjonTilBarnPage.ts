import TestUtils from '../utils/testutils';
import { Selector } from 'testcafe';
import StegSelectors from '../utils/stegSelectors';
import * as moment from 'moment';

export default class RelasjonTilBarnPage {
    adopsjon: {
        gjelderStebarnsadopsjonNei: Selector;
        adopsjonsdato: Selector;
        adoptertIUtlandetJa: Selector;
        adoptertIUtlandetNei: Selector;
        ankomstdato: Selector;
        fødselsdatoerFlere0: Selector;
        feilAnkomstdato: Selector;
    };
    antallBarnSelect: Selector;
    fødselsdato: Selector;
    termindato: Selector;
    ettBarn: Selector;

    constructor() {
        this.antallBarnSelect = Selector('select[name="antallBarnSelect"]');
        this.fødselsdato = Selector('#fødselsdato');
        this.termindato = Selector('input[name="termindato"]');

        this.ettBarn = StegSelectors.radioPanelElement('antallBarn', '1');

        this.adopsjon = {
            fødselsdatoerFlere0: Selector('input[name="fødselsdatoer.flere.0"]'),
            gjelderStebarnsadopsjonNei: StegSelectors.radioPanelElement('adopsjonAvEktefellesBarn', 'nei'),
            adopsjonsdato: Selector('#adopsjonsdato'),
            adoptertIUtlandetJa: StegSelectors.radioPanelElement('adoptertIUtlandet', 'ja'),
            adoptertIUtlandetNei: StegSelectors.radioPanelElement('adoptertIUtlandet', 'Nei'),
            ankomstdato: Selector('#ankomstdato'),
            feilAnkomstdato: Selector('.feil-oppsummering-boks a[href="#ankomstdato"]')
        };
    }

    async velgBarnetErFødt(t: TestController, født: boolean) {
        await TestUtils.selectRadio(t, 'barnFødt', født ? 'ja' : 'nei');
    }

    async velgAntallBarn(t: TestController, antall: number = 1) {
        if (antall <= 3) {
            await TestUtils.selectRadio(t, 'antallBarn', `${antall}`);
        } else {
            await TestUtils.selectRadio(t, 'antallBarn', '3');
            await t.click(this.antallBarnSelect);
            await t.click(this.antallBarnSelect.find(`option[value="${antall}"]`));
        }
    }

    async setFødselsdato(t: TestController, dato?: Date) {
        await TestUtils.setDato(t, this.fødselsdato, dato || new Date());
    }

    async setTermindato(t: TestController, dato?: Date) {
        await TestUtils.setDato(t, this.termindato, dato || new Date());
    }

    async fødtBarn(t: TestController, fødselsdato?: Date) {
        await t.expect(StegSelectors.fortsettKnapp.exists).notOk();

        await this.velgBarnetErFødt(t, true);
        await this.velgAntallBarn(t, 1);
        await this.setFødselsdato(t, fødselsdato || new Date());

        await t.expect(StegSelectors.fortsettKnapp.hasAttribute('disabled')).notOk();
    }

    async ufødtBarn(t: TestController, termindato?: Date) {
        await t.expect(StegSelectors.fortsettKnapp.exists).notOk();

        await this.velgBarnetErFødt(t, false);
        await this.velgAntallBarn(t, 1);
        await this.setTermindato(t, termindato || new Date());

        await t.expect(StegSelectors.fortsettKnapp.hasAttribute('disabled')).notOk();
    }

    async fødtBarnAdopsjon(t: TestController) {
        const fødselsdato = new Date();
        const adopsjonsdato = moment(fødselsdato)
            .add(1, 'day')
            .toDate();

        const ankomstdatoBeforeFødselsdato = moment(fødselsdato)
            .subtract(1, 'day')
            .toDate();

        const ankomstdatoAfterFødselsdato = moment(fødselsdato)
            .add(1, 'day')
            .toDate();

        const { adopsjon } = this;
        await t
            .click(adopsjon.gjelderStebarnsadopsjonNei.parent('label'))
            .typeText(adopsjon.adopsjonsdato, TestUtils.dateToString(adopsjonsdato))
            .pressKey('tab')
            .click(this.ettBarn.parent('label'))
            .typeText(adopsjon.fødselsdatoerFlere0, TestUtils.dateToString(fødselsdato))
            .pressKey('tab')
            .click(adopsjon.adoptertIUtlandetJa.parent('label'))
            .typeText(adopsjon.ankomstdato, TestUtils.dateToString(ankomstdatoBeforeFødselsdato))
            .pressKey('tab');

        await TestUtils.gåVidere(t);

        await t.expect(adopsjon.feilAnkomstdato.exists).ok();

        await t.typeText(adopsjon.ankomstdato, TestUtils.dateToString(ankomstdatoAfterFødselsdato)).pressKey('tab');
    }
}
