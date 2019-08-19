import { Selector } from 'testcafe';

export default class OppsummeringPage {
    bekreftVilkår: Selector;

    constructor() {
        this.bekreftVilkår = Selector('.bekreftCheckboksPanel input[type=checkbox]');
    }

    async aksepterVilkår(t: TestController) {
        await t.click(this.bekreftVilkår.parent());
    }
}
