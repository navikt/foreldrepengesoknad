import { Selector } from 'testcafe';
import TestUtils from '../utils/testutils';

class FrilandsOppdragDialog {
    dialog: Selector;
    navnArbeidsgiver: Selector;
    fom: Selector;
    tom: Selector;
    pågåendeCheck: Selector;
    leggTilBt: Selector;
    avbrytBt: Selector;

    constructor() {
        this.dialog = Selector('.modalForm');
        this.navnArbeidsgiver = this.dialog.find('input[name="oppdragsgiverNavn"]');
        this.fom = this.dialog.find('input[name="fraDatoInput"]');
        this.tom = this.dialog.find('input[name="tilDatoInput"]');
        this.pågåendeCheck = this.dialog.find('input[name="pågåendeOppdrag"]');
        this.avbrytBt = this.dialog.find('button[data-name="avbryt"]');
        this.leggTilBt = this.dialog.find('.modalForm__submitButton');
    }

    async fyllUt(t: TestController, arbeidsgiver: string, fom: Date, tom: Date) {
        await t
            .typeText(this.navnArbeidsgiver, arbeidsgiver)
            .typeText(this.fom, TestUtils.dateToString(fom))
            .typeText(this.tom, TestUtils.dateToString(tom))
            .click(this.leggTilBt);
    }
}

export default FrilandsOppdragDialog;
