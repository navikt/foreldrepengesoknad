import TestUtils from '../utils/testutils';
import { Selector } from 'testcafe';
import Uttaksplan from '../modules/Uttaksplan';

export default class UttaksplanPage {
    planlegger: Selector;
    uttaksplan: Uttaksplan;

    constructor() {
        this.planlegger = Selector('uttaksplanlegger');
        this.uttaksplan = new Uttaksplan();
    }

    async standard(t: TestController) {}

    async fyllUtFar(t: TestController) {
        await this.uttaksplan.leggTilPeriodeForFar(t);
    }
}
