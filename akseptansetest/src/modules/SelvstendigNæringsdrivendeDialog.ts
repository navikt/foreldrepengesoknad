import { Selector } from 'testcafe';
import StegSelectors from '../utils/stegSelectors';
import TestUtils from '../utils/testutils';
import * as moment from 'moment';

class SelvstendigNæringsdrivendeDialog {
    dagmammaCb: Selector;
    navnInput: Selector;
    registrertINorgeRb: Selector;
    orgnrInput: Selector;
    startInput: Selector;
    avsluttetInput: Selector;
    harFortsattVirksomhetCb: Selector;
    inntektInput: Selector;
    harBlittYrkesaktivRb: Selector;
    datoYrkesaktivInput: Selector;
    harRegnskapsførerRb: Selector;
    navnRegnskapseførerInput: Selector;
    tlfRegnskapseførerInput: Selector;
    erNæreVennerRb: Selector;
    leggTilBt: Selector;

    constructor() {
        this.dagmammaCb = StegSelectors.checkboxPanelElement('DAGMAMMA');
        this.navnInput = Selector('input[name="selvstendigNæringsdrivende-navn"]');
        this.registrertINorgeRb = StegSelectors.radioPanelElement('erNæringenRegistrertINorge', 'ja');
        this.orgnrInput = Selector('input[name="selvstendigNæringsdrivende-orgnr"]');
        this.startInput = Selector('input[name="fraDatoInput"]');
        this.avsluttetInput = Selector('input[name="tilDatoInput"]');
        this.harFortsattVirksomhetCb = Selector('input[name="pågåendeVirksomhet"]');
        this.inntektInput = Selector('input[name="selvstendigNæringsdrivende-næringsinntekt"]');
        this.harBlittYrkesaktivRb = StegSelectors.radioPanelElement('harBlittYrkesaktivSisteTreÅr', 'ja');
        this.datoYrkesaktivInput = Selector('input[name="oppstartsdato"]');
        this.harRegnskapsførerRb = StegSelectors.radioPanelElement('harDuRegnskapsfører', 'ja');
        this.navnRegnskapseførerInput = Selector('input[name="næringsrelasjon-navn"]');
        this.tlfRegnskapseførerInput = Selector('input[name="telefonnr"]');
        this.erNæreVennerRb = StegSelectors.radioPanelElement('erNærVennEllerFamilieAvPerson', 'ja');
        this.leggTilBt = Selector('.modalForm__buttonrow button.modalForm__submitButton');
    }

    async fyllUt(t: TestController) {
        const startet: Date = moment()
            .subtract(2, 'years')
            .toDate();
        const avsluttet: Date = moment(startet)
            .add(16, 'months')
            .toDate();
        const yrkesaktiv: Date = moment()
            .subtract(2, 'months')
            .toDate();

        await t
            .click(this.dagmammaCb.parent())
            .typeText(this.navnInput, 'NAV dagmamma')
            .click(this.registrertINorgeRb.parent())
            .typeText(this.orgnrInput, '979312059')
            .typeText(this.startInput, TestUtils.dateToString(startet))
            .pressKey('tab')
            .typeText(this.avsluttetInput, TestUtils.dateToString(avsluttet))
            .pressKey('tab')
            .typeText(this.inntektInput, '250000')
            .click(this.harBlittYrkesaktivRb.parent())
            .typeText(this.datoYrkesaktivInput, TestUtils.dateToString(yrkesaktiv))
            .click(this.harRegnskapsførerRb.parent())
            .typeText(this.navnRegnskapseførerInput, 'Henrik Ibsen')
            .typeText(this.tlfRegnskapseførerInput, '11223344')
            .click(this.erNæreVennerRb.parent())
            .click(this.leggTilBt);
    }
}

export default SelvstendigNæringsdrivendeDialog;
