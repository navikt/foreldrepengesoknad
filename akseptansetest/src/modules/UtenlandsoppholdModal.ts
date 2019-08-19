import * as moment from 'moment';
import { Selector } from 'testcafe';

export default class UtenlandsoppholdModal {
    dialog: Selector;
    landSelect: Selector;
    fom: Selector;
    tom: Selector;
    leggTilBt: Selector;
    avbrytBt: Selector;

    constructor() {
        this.dialog = Selector('.utenlandsoppholdModal');
        this.landSelect = this.dialog.find('select[name="land"]');
        this.fom = this.dialog.find('input[name="fraDatoInput"]');
        this.tom = this.dialog.find('input[name="tilDatoInput"]');
        this.leggTilBt = this.dialog.find('button[data-name="leggTil"]');
        this.avbrytBt = this.dialog.find('button[data-name="avbryt"]');
    }

    async velgLand(t: TestController) {
        await t.click(this.landSelect);
        await t.click(this.landSelect.find(`option[value="IT"]`));
    }

    async velgTidsperiode(t: TestController, fomDate: Date, tomDate: Date) {
        await t.typeText(this.fom, moment(fomDate).format('DD.MM.YYYY'));
        await t.typeText(this.tom, moment(tomDate).format('DD.MM.YYYY'));
    }

    async leggTil(t: TestController) {
        await t.click(this.leggTilBt);
    }
}
