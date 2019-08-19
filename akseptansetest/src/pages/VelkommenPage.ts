import { Selector } from 'testcafe';
import TestUtils from '../utils/testutils';

export default class VelkommenPageModel {
    bekreftVilkår: Selector;
    startSøknadKnapp: Selector;
    søknadstypeRb: Selector;
    velkommenTittel: Selector;

    constructor() {
        this.bekreftVilkår = Selector('.bekreftCheckboksPanel label');
        this.startSøknadKnapp = Selector('.velkommen__startSøknadKnapp');
        this.søknadstypeRb = Selector('input[name="søknadstype"]');
        this.velkommenTittel = Selector('.velkommen__tittel');
    }

    async startFørstegangssøknad(t: TestController) {
        const erEndringssøknad = await this.søknadstypeRb.exists;
        if (erEndringssøknad) {
            await TestUtils.selectRadio(t, 'søknadstype', 'nei');
            await t.click(this.bekreftVilkår).click(this.startSøknadKnapp);
        } else {
            await t.click(this.bekreftVilkår).click(this.startSøknadKnapp);
        }
    }
}
