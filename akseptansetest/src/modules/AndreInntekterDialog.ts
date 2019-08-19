import StegSelectors from '../utils/stegSelectors';
import { Selector } from 'testcafe';
import TestUtils from '../utils/testutils';
import * as moment from 'moment';

class AndreInntekterDialog {
    jobbIUtlandet: {
        rb: Selector;
        landSelect: Selector;
        arbeidsgivernavn: Selector;
    };
    fomInput: Selector;
    tomInput: Selector;
    pågåendeCb: Selector;
    leggTilBt: Selector;

    constructor() {
        this.jobbIUtlandet = {
            rb: StegSelectors.radioPanelElement('inntektstype', 'JOBB_I_UTLANDET'),
            landSelect: Selector('select[name="land"]'),
            arbeidsgivernavn: Selector('input[name="arbeidsgiverNavn"]')
        };
        this.fomInput = Selector('input[name=]');
        this.fomInput = Selector('input[name="fraDatoInput"]');
        this.tomInput = Selector('input[name="tilDatoInput"]');
        this.pågåendeCb = Selector('input[name="pågåendeInntektskilde"]');
        this.leggTilBt = Selector('button.modalForm__submitButton');
    }

    async fyllUt(t: TestController) {
        const fom: Date = moment()
            .subtract(10, 'months')
            .toDate();
        const tom: Date = moment(fom)
            .add(10, 'days')
            .toDate();
        await t
            .click(this.jobbIUtlandet.rb.parent())
            .click(this.jobbIUtlandet.landSelect)
            .click(this.jobbIUtlandet.landSelect.find('option[value="IT"]'))
            .typeText(this.jobbIUtlandet.arbeidsgivernavn, 'Ibsen Foundation')
            .typeText(this.fomInput, TestUtils.dateToString(fom))
            .pressKey('tab')
            .typeText(this.tomInput, TestUtils.dateToString(tom))
            .pressKey('tab')
            .click(this.leggTilBt);
    }
}

export default AndreInntekterDialog;
